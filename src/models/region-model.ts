import request from 'request-promise-native';

type GetRegionParams = {
  species: string;
  chromosome: string;
  start: number;
  end: number;
}

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
