type Region = { // FIXME: region
  name: string
  strand: number
};

type GenomicLocation = {
  start: number,
  end: number
};

export type Slice = {
  region: Region
  location: GenomicLocation
};
