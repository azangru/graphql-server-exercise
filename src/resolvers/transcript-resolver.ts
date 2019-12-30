import { Query, Resolver, Arg, InputType, Field, Root, Ctx, Info, FieldResolver } from "type-graphql";

import { getTranscriptById } from '../models/transcript-model';

import Gene from '../entities/gene';
import Transcript from '../entities/transcript';

import { Context } from '../types/context';
import { TranscriptWithoutGene } from '../types/transcript';

@InputType()
class TranscriptIdInput {
  @Field()
  id: string;
};

@Resolver(() => Transcript)
export default class TranscriptResolver {
  @Query(() => Transcript)
  async transcript(
    @Arg('byId', { nullable: true }) idInput: TranscriptIdInput,
    @Ctx() { store }: Context,
    @Info() queryAST: any
  ) {
    if(idInput) {
      const { id } = idInput;
      await getTranscriptById({id, store, queryAST});
      return store.transcripts[id];
    }
  }

  @FieldResolver(() => Gene)
  gene(@Root() transcript: TranscriptWithoutGene, @Ctx() { store }: Context) {
    const gene = store.genes[transcript.gene_id];

    return gene;
  }

}
