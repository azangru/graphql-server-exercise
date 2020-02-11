import { Field, ObjectType } from 'type-graphql';

import Slice from './slice';

@ObjectType()
export default class Exon {
  @Field(() => String)
  id: string;

  @Field(() => Slice)
  slice: Slice;
}
