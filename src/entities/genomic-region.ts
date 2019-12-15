import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export default class GenomicRegion {
  @Field(() => String)
  name: string;

  @Field(() => Number)
  strand: number
}
