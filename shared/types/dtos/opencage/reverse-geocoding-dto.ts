export type ReverseGeocodingRequest = {
  latitude: number;
  longitude: number;
};

export type ReverseGeocodingResponse = Array<{
  city: string;
  state: string;
}>;