import { Query, Resolver } from "type-graphql";

import Gene from '../entities/gene';

@Resolver(() => Gene)
export default class GeneResolver {
  @Query(() => Gene)
  gene() {
    return {
      id: 1,
      name: 'foo',
      description: 'this is foo'
    };
  }
}
