import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Wallet, WalletRelations} from '../models';

export class WalletRepository extends DefaultCrudRepository<
  Wallet,
  typeof Wallet.prototype.address,
  WalletRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Wallet, dataSource);
  }
}
