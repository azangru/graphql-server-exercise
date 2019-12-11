import { Store as StoreType } from '../types/store';

export const initializeStore = (): StoreType => ({
  genes: {},
  transcripts: {}
});
