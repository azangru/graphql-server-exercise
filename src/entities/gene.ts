import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export default class Gene {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;
}
