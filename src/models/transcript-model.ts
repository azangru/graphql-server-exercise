import request from 'request-promise-native';

import { buildGeneWithoutTranscript } from '../helpers/gene-helpers';
import { buildTranscriptWithoutGene } from '../helpers/transcript-helpers';

import { Store as StoreType } from '../types/store';
import { Transcript as TranscriptType } from '../rest-response-types/transcript';
import { Gene as GeneType } from '../rest-response-types/gene';

type GetTranscriptByIdParams = {
  id: string;
  store: StoreType;
  queryAST: any
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

    if (shouldRequestGene(params.queryAST)) {
      const geneUrl = getLookupUrlById(transcriptResponse.Parent);
      const geneResponse: GeneType = await request(geneUrl, { json: true });
      populateStore(geneResponse, params.store);
    } else {
      populateStore(transcriptResponse, params.store);
    }
  } catch (error) {
    console.log('error', error)
  }
};

const populateStore = (feature: GeneType | TranscriptType, store: StoreType) => {
  if (feature.object_type === 'Gene') {
    const gene = feature;
    store.genes[gene.id] = buildGeneWithoutTranscript(gene);
    gene.Transcript.forEach(transcript => {
      store.transcripts[transcript.id] = buildTranscriptWithoutGene(transcript);
      store.genes[gene.id].transcript_ids.add(transcript.id);
    });
  } else {
    const transcript = feature;
    store.transcripts[transcript.id] = buildTranscriptWithoutGene(transcript);
  }
};

const shouldRequestGene = (queryAST: any) => {
  return queryAST.fieldNodes
    .some((node: any) => node.selectionSet.selections
      .some((selection: any) => selection.name.value === 'gene')
    )
};
