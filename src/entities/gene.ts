import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export default class Gene {
  @Field(() => String)
  id: string;

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

  // should also add transcripts
}
