export type Gene = {
  id: string;
  seq_region_name: string;
  feature_type: 'gene';
  external_name: string;
  description: string;
  version: number;
  biotype: string;
  assembly_name: string;
  strand: number;
  start: number;
  end: number;
};

export type Transcript = {
  id: string;
  seq_region_name: string;
  feature_type: 'transcript';
  external_name: string;
  version: number;
  biotype: string;
  assembly_name: string;
  strand: number;
  start: number;
  end: number;
  Parent: string;
};

export type Exon = {
  id: string;
  seq_region_name: string;
  feature_type: 'exon';
  version: number;
  biotype: string;
  assembly_name: string;
  strand: number;
  start: number;
  end: number;
  Parent: string;
};

export type CDS = {
  id: string; // <-- protein id
  seq_region_name: string;
  feature_type: 'cds';
  assembly_name: string;
  strand: number;
  start: number;
  end: number;
  Parent: string;
};

export type Feature = Gene | Transcript | Exon | CDS;

export type Region = Feature[];
