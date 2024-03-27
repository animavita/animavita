import { ReverseGeocodingRequest, ReverseGeocodingResponse} from '@animavita/types';

import client from './http-client';

export const reverseGeocoding = (coord: ReverseGeocodingRequest) => {
  return client.get<ReverseGeocodingResponse>('/location', { params: coord });
};
