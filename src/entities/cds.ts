import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export default class CDS {
  @Field(() => Number)
  start: number;

  @Field(() => Number)
  end: number;
}
