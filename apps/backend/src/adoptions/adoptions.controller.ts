import { Controller, Get } from '@nestjs/common';
import { AdoptionsService } from './adoptions.service';

@Controller('api/v1/adoptions')
export class AdoptionsController {
  constructor(private readonly adoptionsService: AdoptionsService) {}

  @Get()
  async allAdoptions() {
    return this.adoptionsService.getAdoptions();
  }
}
