import { AdoptionType } from '@animavita/models';

import client from './http-client';

export const getAllAdoptions = () => {
  return client.get<AdoptionType[]>('/adoptions');
};

export const saveOrCreate = (adoption: Partial<AdoptionType>) => {
  const method = adoption.id ? 'patch' : 'post';

  return client[method]<AdoptionType>('/adoptions', adoption);
};
