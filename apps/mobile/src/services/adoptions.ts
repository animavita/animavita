import { CreateAdoptionRequest, UpdateAdoptionRequest, AdoptionResponse } from '@animavita/types';

import client from './http-client';

export const getAllAdoptions = () => {
  return client.get<AdoptionResponse[]>('/adoptions');
};

export const saveOrCreate = (adoption: CreateAdoptionRequest | UpdateAdoptionRequest) => {
  const method = 'id' in adoption ? 'patch' : 'post';

  return client[method]<AdoptionResponse>('/adoptions', adoption);
};
