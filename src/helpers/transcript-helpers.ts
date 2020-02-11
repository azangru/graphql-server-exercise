import {
  Transcript as RegionTranscriptType,
  Exon as RegionExonType
} from '../rest-response-types/region';
import { Transcript as TranscriptType } from '../rest-response-types/transcript';
import { Exon as ExonType } from '../rest-response-types/exon';

import {
  TranscriptWithoutGene
} from '../types/transcript';

type RegionTranscriptWithExons = RegionTranscriptType & { exons: RegionExonType[] }

type SourceTranscript = RegionTranscriptWithExons | TranscriptType;

export const buildTranscriptWithoutGene = (source: SourceTranscript): TranscriptWithoutGene => {
  const exons: ExonType[] = (source as RegionTranscriptWithExons).exons || (source as TranscriptType).Exon

  return {
    id: source.id,
    symbol: (source as RegionTranscriptType).external_name || (source as TranscriptType).display_name || null,
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
    exons: exons.map((exon) => buildExon((exon), source))
  };
};

const buildExon = (exon: ExonType, transcript: SourceTranscript) => {
  return {
    id: exon.id,
    slice: {
      region: {
        name: transcript.seq_region_name,
        strand: transcript.strand
      },
      location: {
        start: exon.start,
        end: exon.end
      }
    }
  }
};
