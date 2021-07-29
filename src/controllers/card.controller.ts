import {
  repository
} from '@loopback/repository';
import {CardRepository} from '../repositories';

/**
 * Controller for Card.
 * @author Hans Govind
 */
export class CardController {
  constructor(
    @repository(CardRepository)
    public cardRepository: CardRepository,
  ) { }
}
