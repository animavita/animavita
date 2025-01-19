import { Injectable } from '@nestjs/common';

interface ReversedGeocodingOutput {
  region: string;
  subregion: string;
}

@Injectable()
export abstract class GeolocationService {
  public abstract reverseGeocoding(
    latitude: string,
    longitude: string,
  ): Promise<ReversedGeocodingOutput>;
}
