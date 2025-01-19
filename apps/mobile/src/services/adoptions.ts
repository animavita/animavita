import { CreateAdoptionRequest, UpdateAdoptionRequest, AdoptionResponse } from '@animavita/types';

import client from './http-client';

export const getAllAdoptions = () => {
  return client.get<AdoptionResponse[]>('/adoptions');
};

export const saveOrCreate = (adoption: CreateAdoptionRequest | UpdateAdoptionRequest) => {
  if ('id' in adoption) {
    return client.patch<AdoptionResponse>('/pets', adoption);
  }

  return client.post<AdoptionResponse>('/pets', adoption);
};
