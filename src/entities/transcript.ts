import { Field, ObjectType } from 'type-graphql';

import Gene from './gene';
import Slice from './slice';

@ObjectType()
export default class Transcript {
  @Field(() => String)
  id: string;

  @Field(() => Number)
  version: string;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String)
  biotype: string;

  @Field(() => String)
  assembly_name: string;

  @Field(() => Slice)
  slice: Slice;

  @Field(() => Gene)
  gene: Gene;
}
