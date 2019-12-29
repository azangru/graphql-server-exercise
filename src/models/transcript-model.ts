import request from 'request-promise-native';

import { buildGeneWithoutTranscript } from '../helpers/gene-helpers';
import { buildTranscriptWithoutGene } from '../helpers/transcript-helpers';

import { Store as StoreType } from '../types/store';
import { Transcript as TranscriptType } from '../rest-response-types/transcript';
import { Gene as GeneType } from '../rest-response-types/gene';

type GetTranscriptByIdParams = {
  id: string;
  store: StoreType;
};

// type GetGeneBySymbolParams = {
//   symbol: string;
//   species: string;
//   store: StoreType;
// };

const getLookupUrlById = (id: string) => {
  return `https://rest.ensembl.org//lookup/id/${id}?content-type=application/json;expand=1`;
}

export const getTranscriptById = async (params: GetTranscriptByIdParams) => {
  const url = getLookupUrlById(params.id);
  try {
    const transcriptResponse: TranscriptType = await request(url, { json: true });
    const geneUrl = getLookupUrlById(transcriptResponse.Parent);
    const geneResponse: GeneType = await request(geneUrl, { json: true });
    populateStore(geneResponse, params.store);
  } catch (error) {
    console.log('error', error)
  }
};

const populateStore = (gene: GeneType, store: StoreType) => {
  store.genes[gene.id] = buildGeneWithoutTranscript(gene);
  gene.Transcript.forEach(transcript => {
    store.transcripts[transcript.id] = buildTranscriptWithoutGene(transcript);
    store.genes[gene.id].transcript_ids.add(transcript.id);
  });
};
