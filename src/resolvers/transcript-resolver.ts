import { Query, Resolver, Root, Ctx, FieldResolver } from "type-graphql";

import Gene from '../entities/gene';
import Transcript from '../entities/transcript';

import { Context } from '../types/context';
import { TranscriptWithoutGene } from '../types/transcript';

@Resolver(() => Transcript)
export default class TranscriptResolver {
  @Query(() => Transcript)
  transcript() {
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

  @FieldResolver(() => Gene)
  gene(@Root() transcript: TranscriptWithoutGene, @Ctx() { store }: Context) {
    const gene = store.genes[transcript.gene_id];

    return gene;
  }

}
