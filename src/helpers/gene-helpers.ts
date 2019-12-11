import {
  Gene as ResponseGeneType
} from '../rest-response-types/region';

import {
  GeneWithoutTranscript
} from '../types/gene';

export const buildGeneWithoutTranscript = (source: ResponseGeneType): GeneWithoutTranscript => {
  return {
    id: source.id,
    name: source.external_name,
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
    description: source.description,
    biotype: source.biotype,
    assembly_name: source.assembly_name,
    transcript_ids: new Set()
  };
};
