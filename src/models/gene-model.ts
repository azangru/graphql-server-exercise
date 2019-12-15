import request from 'request-promise-native';

import { Store as StoreType } from '../types/store';

type GetGeneByIdParams = {
  id: string;
  store: StoreType;
};

type GetGeneBySymbolParams = {
  symbol: string;
  species: string;
  store: StoreType;
};

export const getGeneById = async (params: GetGeneByIdParams) => {
  const url = `https://rest.ensembl.org//lookup/id/${params.id}?content-type=application/json;expand=1`;
  try {
    const response = await request(url, { json: true });
    console.log('response', response);
    // populateStore(response, params.store);
    return response;
  } catch (error) {
    console.log('error', error)
  }
};
