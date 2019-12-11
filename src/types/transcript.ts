import { Slice } from './slice';

export type TranscriptWithoutGene = {
  id: string;
  name?: string;
  version: number;
  slice: Slice;
  biotype: string;
  assembly_name: string,
  gene_id: string,
  exons: []
};
