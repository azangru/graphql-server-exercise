import request from 'request-promise-native';

import {
  Region as RegionType,
  Feature,
  Gene as ResponseGeneType,
  Transcript as ResponseTranscriptType
} from '../rest-response-types/region';

type GetRegionParams = {
  species: string;
  chromosome: string;
  start: number;
  end: number;
}

type Entities = {
  genes: {
    [id: string]: ResponseGeneType
  };
  transcripts: {
    [id: string]: ResponseTranscriptType
  };
};

type FeatureMap = {
  ids: {
    geneIds: string[];
    transcriptIds: string[];
  },
  entities: Entities;
};

export const getRegion = async (params: GetRegionParams) => {
  const reqion = `${params.chromosome}:${params.start}-${params.end}`;
  const url = `https://rest.ensembl.org/overlap/region/${params.species}/${reqion}?content-type=application/json;feature=gene;feature=transcript;feature=exon;feature=cds`;
  try {
    const response = await request(url);
    return response;
  } catch (error) {
    console.log('error', error)
  }
};


const buildEntitiesMap = (response: RegionType) => {
  const entities = response.reduce((result: Entities, feature: Feature) => {
    if (feature.feature_type === 'gene') {
      result.genes[feature.id] = feature;
    } else if (feature.feature_type === 'transcript') {
      result.transcripts[feature.id] = feature;
    }

    return result;
  }, {genes: {}, transcripts: {}});

  response.forEach((feature: Feature) => {
    if (feature.feature_type === 'exon') {
      entities.transcripts[feature.Parent].exons.push(feature);
    }
  });
};
