import { Query, Resolver, Root, Ctx, FieldResolver } from "type-graphql";

import Gene from '../entities/gene';
import Transcript from '../entities/transcript';

import { Context } from '../types/context';
import { GeneWithoutTranscript } from '../types/gene';

@Resolver(() => Gene)
export default class GeneResolver {
  @Query(() => Gene)
  gene() {
    return {
      id: 'x',
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
  transcript(@Root() gene: GeneWithoutTranscript, @Ctx() { store }: Context) {
    const transcripts = [...gene.transcript_ids.values()]
      .map(transcriptId => store.transcripts[transcriptId]);

    return transcripts;
  }

}
