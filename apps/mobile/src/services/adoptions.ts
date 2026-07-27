import {
  CreateAdoptionRequest,
  UpdateAdoptionRequest,
  AdoptionResponse,
  AdoptionRequestResponse,
  AdoptionRequestStatus,
} from '@animavita/types';

import client from './http-client';

export type { AdoptionRequestResponse };
export { AdoptionRequestStatus };

export const getAllAdoptions = () => {
  return client.get<AdoptionResponse[]>('/adoptions');
};

export const saveOrCreate = (adoption: CreateAdoptionRequest | UpdateAdoptionRequest) => {
  if ('id' in adoption) {
    return client.patch<AdoptionResponse>('/pets', adoption);
  }

  return client.post<AdoptionResponse>('/pets', adoption);
};

export const getMyAdoptionRequests = () => {
  return client.get<AdoptionRequestResponse[]>('/adoption-requests/my');
};

export const requestPetAdoption = (petId: string) => {
  return client.post<AdoptionRequestResponse>(`/pets/${petId}/request`);
};

export const denyAdoptionRequest = (requestId: string) => {
  return client.patch<void>(`/adoption-requests/${requestId}/deny`);
};
