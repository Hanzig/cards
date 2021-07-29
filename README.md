# Cards and Decks API

This is an API to handle decks and cards to be used in any game like Poker and Blackjack.

## Setup

The API was implemented and tested with:

- Docker engine 19.03.2, build 6a30dfc
- Docker client 2.1.0.3
- Node.js v16.5.0
- LoopBack 4 CLI

Building and running the API with Docker, from the app's root folder:

```sh
git clone git@github.com:Hanzig/cards.git
cd cards
docker build -t cards . && docker run -p 3000:3000 -d cards
```

The API can now be accessed on http://127.0.0.1:3000/explorer

## Tests

```sh
docker ps     #find container id
docker exec -i -t <containerid> /bin/bash
npm test
```

## Notes

* A handy tool https://www.uuidgenerator.net to generate UUID's for tests.
* I used `deckId` instead of `deck_id` else linter flags the following:

```
Class Property name `deck_id` must match one of the following formats: camelCase, UPPER_CASE, PascalCase  @typescript-eslint/naming-convention
```
