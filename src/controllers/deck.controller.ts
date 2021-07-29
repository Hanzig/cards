import {
  Filter,
  FilterExcludingWhere,
  repository
} from '@loopback/repository';
import {
  get, getModelSchemaRef, param, post, put, requestBody
} from '@loopback/rest';
import {validate as uuidValidate} from 'uuid';
import {Deck} from '../models';
import {CardRepository, DeckRepository} from '../repositories';

/**
 * Class to handle 404 errors.
 */
class NotFound extends Error {
  statusCode: number

  constructor(message: string) {
    super(message)
    this.statusCode = 404
  }
}

/**
 * Controller for Deck.
 * @author Hans Govind
 */
export class DeckController {
  constructor(
    @repository(DeckRepository)
    public deckRepository: DeckRepository,

    @repository(CardRepository)
    public cardRepository: CardRepository
  ) { }

  /**
   * Get all decks.
   * @author Hans Govind
   * @param filter
   * @returns Array of Deck objects
   */
  @get('/api/decks', {
    responses: {
      '200': {
        description: 'Array of Deck model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Deck, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Deck)
    filter?: Filter<Deck>
  ): Promise<Deck[]> {
    return this.deckRepository.find(filter);
  }

  /**
   * Create a deck.
   * @author Hans Govind
   * @param deck
   * @returns Deck
   */
  @post('/api/create_deck', {
    responses: {
      '200': {
        description: 'Create a deck.',
        content: {'application/json': {schema: getModelSchemaRef(Deck)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Deck),
        },
      },
    })
    deck: Deck,
  ): Promise<Deck> {

    // Validate UUID.
    if (!uuidValidate(deck.deckId) || deck.deckId === "") {
      throw new NotFound('deckId not a valid UUID')
    }
    // Get all cards.
    let cards = await this.cardRepository.find();

    // Shuffle cards if deck.shuffled==true.
    if (deck.shuffled) {
      cards = cards.sort(() => Math.random() - 0.5);
    }

    // Make sure deck.remaining always holds the correct number of cards, 0-52.
    if (deck.remaining < 0) {
      deck.remaining = 0;
    }

    if (deck.remaining > 52) {
      deck.remaining = 52;
    }

    // Fetch number of cards from deck.
    const deckCards = cards.slice(0, deck.remaining);
    deck.cards = deckCards;

    return this.deckRepository.create(deck);
  }

  /**
   * Open a deck by uuid.
   * @author Hans Govind
   * @param id
   * @param filter
   * @returns Deck
   */
  @get('/api/open_deck/{deckId}', {
    responses: {
      '200': {
        description: 'Open deck by UUID.',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Deck, {includeRelations: true}),
          },
        },
      }
    },
  })
  async findById(
    @param.path.string('deckId') deckId: string,
    @param.filter(Deck, {exclude: 'where'}) filter?: FilterExcludingWhere<Deck>,
  ): Promise<Deck> {

    // Validate UUID.
    if (!uuidValidate(deckId) || deckId === "") {
      throw new NotFound('deckId not a valid UUID')
    }

    return this.deckRepository.findById(deckId, filter);
  }

  /**
   * Draw cards from a deck.
   * @author Hans Govind
   * @param deckId
   * @param count
   * @returns Drawn cards.
   */
  @put('/api/draw/{deckId}/{count}', {
    responses: {
      '200': {
        description: 'Draw cards from deck.',
      },
    },
  })
  async replaceById(
    @param.path.string('deckId') deckId: string,
    @param.path.number('count') count: number,
  ): Promise<object> {

    // Validate UUID.
    if (!uuidValidate(deckId) || deckId === "") {
      throw new NotFound('deckId not a valid UUID')
    }

    // Count and fetch the cards from the top of the cards object.
    const deck = await this.deckRepository.findById(deckId);
    const drawnCards = deck.cards?.splice(0, count);
    const drawnCardsObject = {"cards": drawnCards};

    // Update deck.remaining = deck.cards.length.
    deck.remaining = deck.cards?.length ?? 0;

    // Update the deck cards and 'remaining' value.
    await this.deckRepository.replaceById(deckId, deck);
    return drawnCardsObject;
  }
}
