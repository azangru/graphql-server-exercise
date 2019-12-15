import { Query, Resolver, Field, Int, Args, Ctx, ArgsType, FieldResolver } from "type-graphql";

import Region from '../entities/region';
import Gene from '../entities/gene';
import Transcript from '../entities/transcript';

import { getRegion } from '../models/region-model';

import { Context } from '../types/context';

@ArgsType()
class RegionArgs {
  @Field(() => String, { nullable: false })
  species: string;

  @Field(() => String, { nullable: false })
  chromosome: string;

  @Field(() => Int, { nullable: false })
  start: number;

  @Field(() => Int, { nullable: false })
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

  @FieldResolver(() => [Gene])
  genes(@Ctx() { store }: Context) {
    return [...store.region.genes.values()]
      .map(geneId => store.genes[geneId]);
  }

  @FieldResolver(() => [Transcript])
  transcripts(@Ctx() { store }: Context) {
    return [...store.region.transcripts.values()]
      .map(transcriptId => store.transcripts[transcriptId]);
  }
}
