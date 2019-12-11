import { Query, Resolver, Field, Int, Args, Ctx, ArgsType, FieldResolver } from "type-graphql";

import Region from '../entities/region';

import { getRegion } from '../models/region-model';

import { Context } from '../types/context';

@ArgsType()
class RegionArgs {
  @Field(type => String, { nullable: false })
  species: string;

  @Field(type => String, { nullable: false })
  chromosome: string;

  @Field(type => Int, { nullable: false })
  start: number;

  @Field(type => Int, { nullable: false })
  end: number;
}

@Resolver(() => Region)
export default class RegionResolver {
  @Query(() => Region)
  async region(
    @Args() { species, chromosome, start, end }: RegionArgs,
    @Ctx() { store }: Context
  ) {
    await(getRegion({ species, chromosome, start, end, store }));
    return {
      chromosome,
      start,
      end
    };
  }

  @FieldResolver()
  genes(@Ctx() { store }: Context) {
    return Object.values(store.genes);
  }
}
