import {
  Transcript as ResponseTranscriptType
} from '../rest-response-types/region';

import {
  TranscriptWithoutGene
} from '../types/transcript';

export const buildTranscriptWithoutGene = (source: ResponseTranscriptType): TranscriptWithoutGene => {
  return {
    id: source.id,
    name: source.external_name || null,
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
