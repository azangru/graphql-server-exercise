import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export default class Location {
  @Field(() => Number)
  start: number;

  @Field(() => Number)
  end: number
}
