import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { AccountService } from './account.service';
import { AccountType } from './account.model';

@Resolver(() => AccountType)
export class AccountResolver {
  constructor(private accountService: AccountService) {}

  @Query(() => [AccountType])
  accounts() {
    return this.accountService.getAccounts();
  }

  @Mutation(() => AccountType)
  addIndexer(@Args('indexer') indexer: string) {
    return this.accountService.addIndexer(indexer);
  }

  @Mutation(() => AccountType)
  updateController(
    @Args('controller') controller: string,
  ) {
    return this.accountService.addController(controller);
  }
}
