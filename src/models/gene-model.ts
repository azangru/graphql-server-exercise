import request from 'request-promise-native';

import { buildGeneWithoutTranscript } from '../helpers/gene-helpers';
import { buildTranscriptWithoutGene } from '../helpers/transcript-helpers';

import { Store as StoreType } from '../types/store';
import { Gene as GeneType } from '../rest-response-types/gene';

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
  const url = `https://rest.ensembl.org/lookup/id/${params.id}?content-type=application/json;expand=1`;
  try {
    const response = await request(url, { json: true });
    populateStore(response, params.store);
    return response;
  } catch (error) {
    console.log('error', error)
  }
};

export const getGeneBySymbol = async (params: GetGeneBySymbolParams) => {
  const url = `https://rest.ensembl.org/lookup/symbol/${params.species}/${params.symbol}?content-type=application/json;expand=1`;
  try {
    const response = await request(url, { json: true });
    populateStore(response, params.store);
    return response;
  } catch (error) {
    console.log('error', error)
  }
}

const populateStore = (gene: GeneType, store: StoreType) => {
  store.genes[gene.id] = buildGeneWithoutTranscript(gene);
  gene.Transcript.forEach(transcript => {
    store.transcripts[transcript.id] = buildTranscriptWithoutGene(transcript);
    store.genes[gene.id].transcript_ids.add(transcript.id);
  });
};
