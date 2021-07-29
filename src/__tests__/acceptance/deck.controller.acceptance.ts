import {RestBindings} from '@loopback/rest';
import {
  Client,
  createRestAppClient,
  expect,
  givenHttpServerConfig,
  toJSON
} from '@loopback/testlab';
import {CardsApplication} from '../../application';
import {Deck} from '../../models/';
import {DeckRepository} from '../../repositories/';
import {
  givenDeck, newDeck
} from '../helpers';

describe('CardsApplication', () => {
  let app: CardsApplication;
  let client: Client;
  let deckRepo: DeckRepository;

  before(givenRunningApplicationWithCustomConfiguration);
  after(() => app.stop());

  before(givenDeckRepository);
  before(() => {
    client = createRestAppClient(app);
  });

  beforeEach(async () => {
    await deckRepo.deleteAll();
  });

  it('creates a deck', async function () {
    const deck = newDeck();
    const response = await client.post('/api/create_deck').send(deck).expect(200);
    expect(response.body).to.containDeep(deck);
    const result = await deckRepo.findById(response.body.deckId);
    expect(result).to.containDeep(deck);
  });

  context('when dealing with a single persisted deck', () => {
    let persistedDeck: Deck;

    beforeEach(async () => {
      persistedDeck = await givenDeckInstance();
    });

    it('gets a deck by UUID', () => {
      return client
        .get(`/api/open_deck/${persistedDeck.deckId}`)
        .send()
        .expect(200, toJSON(persistedDeck));
    });

  });

  /*
   ============================================================================
   TEST HELPERS
   These functions help simplify setup of your test fixtures so that your tests
   can:
   - operate on a "clean" environment each time (a fresh in-memory database)
   - avoid polluting the test with large quantities of setup logic to keep
   them clear and easy to read
   - keep them DRY (who wants to write the same stuff over and over?)
   ============================================================================
   */

  async function givenRunningApplicationWithCustomConfiguration() {
    app = new CardsApplication({
      rest: givenHttpServerConfig(),
    });

    app.bind(RestBindings.REQUEST_BODY_PARSER_OPTIONS).to({
      validation: {
        prohibitedKeys: ['badKey'],
      },
    });

    await app.boot();

    /**
     * Override default config for DataSource for testing so we don't write
     * test data to file when using the memory connector.
     */
    app.bind('datasources.config.db').to({
      name: 'db',
      connector: 'memory',
    });

    // Start Application
    await app.start();
  }

  async function givenDeckRepository() {
    deckRepo = await app.getRepository(DeckRepository);
  }

  async function givenDeckInstance(deck?: Partial<Deck>) {
    return deckRepo.create(givenDeck(deck));
  }
});
