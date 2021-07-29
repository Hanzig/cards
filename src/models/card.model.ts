import {Entity, model, property} from '@loopback/repository';

/**
 * Card model.
 * @author Hans Govind
 */
@model()
export class Card extends Entity {
  @property({
    type: 'string',
    id: true,
    description: 'Code of the card. Also used as unique id.',
  })
  code: string;

  @property({
    type: 'string',
    required: true,
    description: 'Suit of the card.',
  })
  suit: string;

  @property({
    type: 'string',
    required: true,
    description: 'Value of the card.',
  })
  value: string;

  constructor(data?: Partial<Card>) {
    super(data);
  }
}

export interface CardRelations {
  // describe navigational properties here
}

export type CardWithRelations = Card & CardRelations;
