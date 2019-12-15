import { Field, ObjectType } from 'type-graphql';

import Gene from './gene';
import Transcript from './transcript';

@ObjectType()
export default class Region {
  @Field(() => String)
  chromosome: string;

  @Field(() => Number)
  start: number;

  @Field(() => Number)
  end: number;

  @Field(() => [Gene])
  genes: Gene[];

  @Field(() => [Transcript])
  transcripts: Transcript[];
}
