import { Field, ObjectType } from 'type-graphql';

import Location from './location';
import GenomicRegion from './genomic-region';

@ObjectType()
export default class Slice {
  @Field(() => Location)
  location: Location

  @Field(() => GenomicRegion)
  region: GenomicRegion
}
