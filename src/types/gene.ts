import { Slice } from './slice';

export type GeneWithoutTranscript = {
  id: string;
  name: string;
  version: number;
  slice: Slice;
  description: string;
  biotype: string;
  assembly_name: string,
  transcript_ids: Set<string>
};
