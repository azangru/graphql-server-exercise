import { Field, ObjectType } from 'type-graphql';

import Transcript from './transcript';
import Slice from './slice';

@ObjectType()
export default class Gene {
  @Field(() => String)
  id: string;

  @Field(() => Number)
  version: number;

  @Field(() => String)
  symbol: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String)
  seq_region_name: string;

  @Field(() => String)
  biotype: string;

  @Field(() => String)
  assembly_name: string;

  @Field(() => Slice)
  slice: Slice;

  @Field(() => [Transcript])
  transcripts: Transcript[]
}
