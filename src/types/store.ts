import {
  GeneWithoutTranscript
} from './gene';
import {
  TranscriptWithoutGene
} from './transcript';

export type Store = {
  region: {
    genes: Set<string>,
    transcripts: Set<string>
  };
  genes: {
    [id: string]: GeneWithoutTranscript
  };
  transcripts: {
    [id: string]: TranscriptWithoutGene
  };
};
