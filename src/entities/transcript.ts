import { Field, ObjectType } from 'type-graphql';

import Gene from './gene';
import Slice from './slice';
import Exon from './exon';
import CDS from './cds';

@ObjectType()
export default class Transcript {
  @Field(() => String)
  id: string;

  @Field(() => Number)
  version: string;

  @Field(() => String, { nullable: true })
  symbol: string;

  @Field(() => String)
  biotype: string;

  @Field(() => String)
  assembly_name: string;

  @Field(() => Slice)
  slice: Slice;

  @Field(() => [Exon])
  exons: Exon[];

  @Field(() => CDS)
  cds: CDS;

  @Field(() => Gene)
  gene: Gene;
}
