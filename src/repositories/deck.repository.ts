import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Deck, DeckRelations} from '../models';

/**
 * Deck repository.
 * @author Hans Govind
 */
export class DeckRepository extends DefaultCrudRepository<
  Deck,
  typeof Deck.prototype.deckId,
  DeckRelations
> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(Deck, dataSource);
  }
}
