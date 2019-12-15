import { Query, Resolver, Arg, InputType, Field, Root, Ctx, FieldResolver } from "type-graphql";

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
  gene(
    @Arg('byId', { nullable: true }) idInput: IdInput,
    @Arg('bySymbol', { nullable: true }) symbolInput: SymbolInput,
  ) {
    console.log('id', idInput, 'symbolInput', symbolInput);

    return {
      id: 'xkcd',
      version: '1',
      name: 'foo',
      description: 'this is foo',
      seq_region_name: 'some region',
      symbol: 'foo',
      biotype: 'who knows',
      assembly_name: 'no clue'
    };
  }

  @FieldResolver(() => [Transcript])
  transcripts(@Root() gene: GeneWithoutTranscript, @Ctx() { store }: Context) {
    const transcripts = [...gene.transcript_ids.values()]
      .map(transcriptId => store.transcripts[transcriptId]);

    return transcripts;
  }

}
