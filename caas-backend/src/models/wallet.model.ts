import {Entity, model, property} from '@loopback/repository';

@model()
export class Wallet extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  address: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    default: 0,
  })
  balance?: number;


  constructor(data?: Partial<Wallet>) {
    super(data);
  }
}

export interface WalletRelations {
  // describe navigational properties here
}

export type WalletWithRelations = Wallet & WalletRelations;
