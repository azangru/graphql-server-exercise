import { Query, Resolver, Arg, InputType, Field, Root, Ctx, FieldResolver } from "type-graphql";

import { getGeneById, getGeneBySymbol } from '../models/gene-model';

import Gene from '../entities/gene';
import Transcript from '../entities/transcript';

import { Context } from '../types/context';
import { GeneWithoutTranscript } from '../types/gene';

@InputType()
class IdInput {
  @Field()
  id: string;
};

@InputType()
class SymbolInput {
  @Field()
  symbol: string;

  @Field()
  species: string;
};

@Resolver(() => Gene)
export default class GeneResolver {
  @Query(() => Gene)
  async gene(
    @Arg('byId', { nullable: true }) idInput: IdInput,
    @Arg('bySymbol', { nullable: true }) symbolInput: SymbolInput,
    @Ctx() { store }: Context
  ) {
    if (idInput) {
      const { id } = idInput;
      await getGeneById({id, store});
      return store.genes[id];
    } else if (symbolInput) {
      const { symbol, species } = symbolInput;
      await getGeneBySymbol({symbol, species, store});
      const gene = Object.values(store.genes).find(gene => gene.symbol === symbol);
      return gene;
    }
  }

  @FieldResolver(() => [Transcript])
  transcripts(@Root() gene: GeneWithoutTranscript, @Ctx() { store }: Context) {
    const transcripts = [...gene.transcript_ids.values()]
      .map(transcriptId => store.transcripts[transcriptId]);

    return transcripts;
  }

}
