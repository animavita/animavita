import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { GeolocationService } from '../core/application/dao/geolocation.service.abstract';

@Injectable()
export class OpenCageService extends GeolocationService {
  constructor(private readonly httpService: HttpService) {
    super();
  }

  async reverseGeocoding(latitude: string, longitude: string): Promise<any> {
    if (!latitude || !longitude) {
      throw new Error('Latitude and longitude must be provided.');
    }

    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${process.env.OPENCAGE_KEY}`;

    try {
      const response = await this.httpService.get(url).toPromise();
      const parsedData = response.data;
      if (parsedData && parsedData.results) {
        return parsedData.results.map((address) => ({
          region: address.components.city || address.components.municipality,
          subregion: address.components.state || address.components.county,
        }));
      } else {
        throw new Error('Failed to parse response data.');
      }
    } catch (error) {
      throw new Error(
        `Error fetching data from OpenCage API: ${error.message}`,
      );
    }
  }
}
