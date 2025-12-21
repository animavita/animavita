import { AdoptionType } from '@animavita/types';

import client from './http-client';

export type PetNearMeResponse = {
  id: string;
  name: string;
  maturity: string;
  breed: string;
  gender: string;
  location: {
    longitude: number;
    latitude: number;
  };
  observations: string;
  photos: string[];
  size: string;
  type: string;
  user: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
};

export const getMyPets = () => {
  return client.get<(AdoptionType & { id: string })[]>('/pets/my');
};

export const getPetsNearMe = (radius: number = 20) => {
  return client.get<PetNearMeResponse[]>(`/pets/nearMe?radius=${radius}`);
};
