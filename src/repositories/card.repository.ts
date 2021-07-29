import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Card, CardRelations} from '../models';

/**
 * Card repository.
 * @author Hans Govind
 */
export class CardRepository extends DefaultCrudRepository<
  Card,
  typeof Card.prototype.code,
  CardRelations
> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(Card, dataSource);
  }
}
