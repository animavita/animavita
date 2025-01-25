import { AdoptionType } from '@animavita/types';

import client from './http-client';

export const getMyPets = () => {
  return client.get<(AdoptionType & { id: string })[]>('/pets/my');
};
