import { Module } from '@nestjs/common';

import { OpenCageService } from '../frameworks/opencage.service';
import { GeolocationService } from '../core/application/dao/geolocation.service.abstract';
import { HttpModule } from '@nestjs/axios';
import { GeolocationController } from '../infra/controllers/geolocation.controller';

@Module({
  imports: [HttpModule],
  controllers: [GeolocationController],
  providers: [
    {
      provide: GeolocationService,
      useClass: OpenCageService,
    },
  ],
})
export class GeolocationModule {}
