import { Transcript } from './transcript';

export type Gene = {
  object_type: "Gene",
  id: string;
  biotype: string;
  display_name: string;
  strand: number;
  seq_region_name: string;
  assembly_name: string;
  start: number;
  end: number;
  version: number;
  description: string;
  Transcript: Transcript[]
};
