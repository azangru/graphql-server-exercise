import { Field, ObjectType } from 'type-graphql';

import Gene from './gene';

@ObjectType()
export default class Transcript {
  @Field(() => String)
  id: string;

  @Field(() => Number)
  version: string;

  @Field(() => String, { nullable: true })
  name: string;

  // @Field(() => String)
  // seq_region_name: string;

  @Field(() => String)
  biotype: string;

  @Field(() => String)
  assembly_name: string;

  @Field(() => Gene)
  gene: Gene;

  // @Field(() => Number)
  // strand: number;
  //
  // @Field(() => Number)
  // start: number;
  //
  // @Field(() => Number)
  // end: number;

  // should also add transcripts
}
