type Exon = {
  object_type: "Exon";
  id: string;
  version: number;
  assembly_name: string;
  seq_region_name: string;
  start: number;
  end: number
  strand: number
};

export type Transcript = {
  object_type: "Transcript";
  id: string;
  version: number;
  is_canonical: number;
  Parent: string;
  assembly_name: string;
  display_name: string;
  seq_region_name: string;
  strand: number;
  start: number;
  end: number;
  biotype: string;
  Exon: Exon[];
  Translation: Translation
};

type Translation = {
  object_type: string,
  id: string,
  length: number,
  start: number,
  end: number
}


/*

Translation: {
object_type: "Translation",
id: "ENSP00000419060",
db_type: "core",
length: 767,
start: 140726494,
species: "homo_sapiens",
Parent: "ENST00000496384",
end: 140924703
},

*/
