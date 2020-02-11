import { Slice } from './slice';

export type GeneWithoutTranscript = {
  id: string;
  symbol: string;
  version: number;
  slice: Slice;
  description: string;
  biotype: string;
  assembly_name: string,
  transcript_ids: Set<string>
};
