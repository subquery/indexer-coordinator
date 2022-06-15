// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { AccountService } from './account.service';
import { AccountMetaDataType, AccountType } from './account.model';

@Resolver(() => AccountType)
export class AccountResolver {
  constructor(private accountService: AccountService) { }

  @Query(() => [AccountType])
  accounts() {
    return this.accountService.getAccounts();
  }

  @Mutation(() => AccountType)
  addIndexer(@Args('indexer') indexer: string) {
    return this.accountService.addIndexer(indexer);
  }

  @Query(() => AccountMetaDataType)
  accountMetadata() {
    return this.accountService.getMetadata();
  }

  @Mutation(() => String)
  updateController() {
    return this.accountService.addController();
  }

  @Mutation(() => String)
  removeAccounts() {
    return this.accountService.removeAccounts();
  }
}
