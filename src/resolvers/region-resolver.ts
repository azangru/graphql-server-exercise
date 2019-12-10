import { Query, Resolver, Field, Int, Args, ArgsType } from "type-graphql";

import Region from '../entities/region';

import { getRegion } from '../models/region-model';

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
  async region(@Args() { species, chromosome, start, end }: RegionArgs) {
    await(getRegion({ species, chromosome, start, end }));
    return {
      chromosome,
      start,
      end,
      genes: [{
        id: 1,
        name: 'foo',
        description: 'this is foo'
      }]
    };
  }
}
