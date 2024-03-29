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
  let cds = { // this is very much mocked
    start: source.start,
    end: source.end,
    relative_location: {
      start: source.start,
      end: source.end
    }
  };
  if ((source as TranscriptType).Translation) {
    const Translation = (source as TranscriptType).Translation;
    cds = {
      start: Translation.start,
      end: Translation.end,
      relative_location: {
        start: Translation.start,
        end: Translation.end
      }
    }
  }

  return {
    id: source.id,
    symbol: (source as RegionTranscriptType).external_name || (source as TranscriptType).display_name || null,
    version: source.version,
    slice: {
      region: {
        name: source.seq_region_name,
        strand: {
          code: source.strand === 1 ? 'forward' : 'reverse',
          value: source.strand
        }
      },
      location: {
        start: source.start,
        end: source.end
      }
    },
    cds,
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
        strand: {
          code: transcript.strand === 1 ? 'forward' : 'reverse',
          value: transcript.strand
        }
      },
      location: {
        start: exon.start,
        end: exon.end
      }
    }
  }
};
