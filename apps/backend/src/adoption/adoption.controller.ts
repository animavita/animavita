import { Controller, Delete, Get, Param } from '@nestjs/common';
import { AdoptionsService } from './adoption.service';

@Controller('api/v1/adoptions')
export class AdoptionsController {
  constructor(private readonly adoptionsService: AdoptionsService) {}

  @Get()
  async findAll() {
    return this.adoptionsService.findAll();
  }

  @Delete(':id')
  async deleteAdoption(@Param('id') adoptionId: string) {
    return this.adoptionsService.deleteAdoption(adoptionId);
  }
}
