import {
  Gene as RegionGeneType
} from '../rest-response-types/region';
import { Gene as GeneType } from '../rest-response-types/gene';

import {
  GeneWithoutTranscript
} from '../types/gene';

type SourceGene = RegionGeneType | GeneType;

export const buildGeneWithoutTranscript = (source: SourceGene): GeneWithoutTranscript => {
  return {
    id: source.id,
    name: (source as RegionGeneType).external_name || (source as GeneType).display_name,
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
