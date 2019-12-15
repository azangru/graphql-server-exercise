import { Store as StoreType } from '../types/store';

export const initializeStore = (): StoreType => ({
  region: {
    genes: new Set(),
    transcripts: new Set()
  },
  genes: {},
  transcripts: {}
});
