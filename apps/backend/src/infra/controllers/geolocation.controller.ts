import { Controller, Get, Query } from '@nestjs/common';
import { GeolocationService } from '../../core/application/dao/geolocation.service.abstract';

@Controller('api/v1/location')
export class GeolocationController {
  constructor(private readonly geolocationService: GeolocationService) {}

  @Get()
  async reverseGeocoding(
    @Query('latitude') latitude: string,
    @Query('longitude') longitude: string,
  ): Promise<any> {
    return this.geolocationService.reverseGeocoding(latitude, longitude);
  }
}
