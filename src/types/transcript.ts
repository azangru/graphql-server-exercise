import { Slice } from './slice';
import { Exon } from './exon';
import { CDS } from './cds';

export type TranscriptWithoutGene = {
  id: string;
  symbol?: string;
  version: number;
  slice: Slice;
  biotype: string;
  assembly_name: string;
  gene_id: string;
  exons: Exon[];
  cds: CDS;
};
