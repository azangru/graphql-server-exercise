import {
  Transcript as RegionTranscriptType
} from '../rest-response-types/region';
import { Transcript as TranscriptType } from '../rest-response-types/transcript';

import {
  TranscriptWithoutGene
} from '../types/transcript';

type SourceTranscript = RegionTranscriptType | TranscriptType;

export const buildTranscriptWithoutGene = (source: SourceTranscript): TranscriptWithoutGene => {
  return {
    id: source.id,
    name: (source as RegionTranscriptType).external_name || (source as TranscriptType).display_name || null,
    version: source.version,
    slice: {
      region: { // FIXME: region
        name: source.seq_region_name,
        strand: source.strand
      },
      location: {
        start: source.start,
        end: source.end
      }
    },
    biotype: source.biotype,
    assembly_name: source.assembly_name,
    gene_id: source.Parent,
    exons: []
  };
};
