import {
  GeneWithoutTranscript
} from './gene';

export type Store = {
  genes: {
    [id: string]: GeneWithoutTranscript
  };
  transcripts: {
    [id: string]: ResponseTranscriptType
  };
};
