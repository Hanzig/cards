import {Entity, model, property} from '@loopback/repository';
import {Card} from './card.model';


/**
 * Deck model.
 * @author Hans Govind
 */
@model()
export class Deck extends Entity {
  @property({
    type: 'string',
    id: true,
    description: 'The UUID of the deck.',
  })
  deckId: string;

  @property({
    type: 'boolean',
    required: true,
    description: 'Determines if the deck is shuffled (true) or not (false).',
  })
  shuffled: boolean;

  @property({
    type: 'number',
    required: true,
    description: 'Number of cards in the deck.',
  })
  remaining: number;

  @property({
    type: 'string',
    description: 'Name of the game for which the deck is used.',
  })
  game: string;

  @property.array(Card, {})
  cards?: Card[];

  constructor(data?: Partial<Deck>) {
    super(data);
  }
}

export interface DeckRelations {
  // describe navigational properties here
}

export type DeckWithRelations = Deck & DeckRelations;
