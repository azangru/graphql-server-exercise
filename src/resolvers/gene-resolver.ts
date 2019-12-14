import { Query, Resolver, FieldResolver } from "type-graphql";

import Gene from '../entities/gene';
import Transcript from '../entities/transcript';

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

  @FieldResolver(() => Transcript)
  transcript() {
    console.log('transcript was called');
    return {
      id: 'transcript id'
    };
  }

}
