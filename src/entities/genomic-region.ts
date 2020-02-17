import { Field, ObjectType } from 'type-graphql';

@ObjectType()
class Strand {
  @Field(() => String)
  code: string; // 'forward' or 'reverse'

  @Field(() => Number)
  value: number  // 1 or -1
}

@ObjectType()
export default class GenomicRegion {
  @Field(() => String)
  name: string;

  @Field(() => Strand)
  strand: Strand
}
