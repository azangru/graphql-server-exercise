type Region = {
  name: string
  strand: {
    code: string // 'forward' or 'reverse',
    value: number // 1 or -1
  }
};

type GenomicLocation = {
  start: number,
  end: number
};

export type Slice = {
  region: Region
  location: GenomicLocation
};
