import {Deck} from '../models/index';

/**
 * Generate a complete Deck object for use with tests.
 * @param deck - A partial (or complete) Deck object.
 */
export function givenDeck(deck?: Partial<Deck>) {
  const data = Object.assign(
    {
      "deckId": "904fe833-f174-4fb2-8faf-bfd63adc61e0",
      "shuffled": true,
      "remaining": 8,
      "cards": [
        {
          "code": "JS",
          "suit": "SPADES",
          "value": "JACK"
        },
        {
          "code": "9H",
          "suit": "HEARTS",
          "value": "9"
        },
        {
          "code": "JH",
          "suit": "HEARTS",
          "value": "JACK"
        },
        {
          "code": "KC",
          "suit": "CLUBS",
          "value": "KING"
        },
        {
          "code": "10C",
          "suit": "DIAMONDS",
          "value": "10"
        },
        {
          "code": "QH",
          "suit": "HEARTS",
          "value": "QUEEN"
        },
        {
          "code": "3C",
          "suit": "DIAMONDS",
          "value": "3"
        },
        {
          "code": "KD",
          "suit": "DIAMONDS",
          "value": "KING"
        }
      ]
    },
    deck,
  );
  return new Deck(data);
}

/**
 * Generate a new Deck object for use with tests.
 * @param deck - A partial (or complete) Deck object.
 */
export function newDeck(deck?: Partial<Deck>) {
  const data = Object.assign(
    {
      "deckId": "904fe833-f174-4fb2-8faf-bfd63adc61e0",
      "shuffled": false,
      "remaining": 2,

    },
    deck,
  );
  return new Deck(data);
}
