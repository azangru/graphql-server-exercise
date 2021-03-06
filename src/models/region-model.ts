import request from 'request-promise-native';

import { buildGeneWithoutTranscript } from '../helpers/gene-helpers';
import { buildTranscriptWithoutGene } from '../helpers/transcript-helpers';

import {
  Region as RegionType,
  Transcript,
  Feature,
  Exon
} from '../rest-response-types/region';
import { Store as StoreType } from '../types/store';

type GetRegionParams = {
  species: string;
  chromosome: string;
  start: number;
  end: number;
  store: StoreType
};

export const getRegion = async (params: GetRegionParams) => {
  const reqion = `${params.chromosome}:${params.start}-${params.end}`;
  const url = `https://rest.ensembl.org/overlap/region/${params.species}/${reqion}?content-type=application/json;feature=gene;feature=transcript;feature=exon;feature=cds`;
  try {
    const response = await request(url, { json: true });
    populateStore(response, params.store);
    return response;
  } catch (error) {
    console.log('error', error)
  }
};


const populateStore = (response: RegionType, store: StoreType) => {
  // in the first pass, build genes and transcripts
  response.forEach((feature: Feature) => {
    if (feature.feature_type === 'gene' && !store.genes[feature.id]) {
      store.genes[feature.id] = buildGeneWithoutTranscript(feature);
      store.region.genes.add(feature.id);
    } else if (feature.feature_type === 'transcript' && !store.transcripts[feature.id]) {
      const transcriptWithExons = buildTranscriptWithoutGene(addExonsToTranscript(feature, response))
      store.transcripts[feature.id] = transcriptWithExons;
      store.region.transcripts.add(feature.id);
    }
  });

  response.forEach((feature: Feature) => {
    if (feature.feature_type === 'transcript') {
      const gene = store.genes[feature.Parent];
      gene.transcript_ids.add(feature.id);
    }
  });
};

const addExonsToTranscript = (transcript: Transcript, response: RegionType): Transcript & { exons: Exon[] } => {
  const exons = response.filter(feature => feature.feature_type === 'exon' && feature.Parent === transcript.id) as Exon[];
  return {
    ...transcript,
    exons
  };
}
