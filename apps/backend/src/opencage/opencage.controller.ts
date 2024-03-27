import { Controller, Get, Query } from '@nestjs/common';
import * as https from 'https';

@Controller('api/v1/location')
export class OpencageController {
  @Get()
  async reverseGeocoding(@Query('latitude') latitude: string, @Query('longitude') longitude: string): Promise<any> {
    if (!latitude || !longitude) {
      throw new Error('Latitude and longitude must be provided.');
    }

    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${process.env.OPENCAGE_KEY}`;

    return new Promise((resolve, reject) => {
      https.get(url, (response) => {
        let data = '';

        response.on('data', (chunk) => {
          data += chunk;
        });

        response.on('end', () => {

          resolve(JSON.parse(data)?.results.map(address => ({region: address.components.city, subregion: address.components.state})));
        });
      }).on('error', (error) => {
        reject(error);
      });
    });
  }
}
