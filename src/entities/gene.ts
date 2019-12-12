import { Field, ObjectType } from 'type-graphql';

import Transcript from './transcript';

@ObjectType()
export default class Gene {
  @Field(() => String)
  id: string;

  @Field(() => Number)
  version: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String)
  seq_region_name: string;

  @Field(() => String)
  symbol: string;

  @Field(() => String)
  biotype: string;

  @Field(() => String)
  assembly_name: string;

  @Field(() => Number)
  strand: number;

  @Field(() => Number)
  start: number;

  @Field(() => Number)
  end: number;

  @Field(() => [Transcript])
  transcripts: Transcript[]

  // should also add transcripts
}
