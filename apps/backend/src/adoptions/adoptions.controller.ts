import { AdoptionType } from '@animavita/models';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AdoptionsService } from './adoptions.service';

@Controller('api/v1/adoptions')
export class AdoptionsController {
  constructor(private readonly adoptionsService: AdoptionsService) {}

  @Post()
  async createAdoption(@Body() adoption: AdoptionType) {
    return this.adoptionsService.createAdoption(adoption);
  }

  @Patch()
  async updateAdoption(@Body() adoption: AdoptionType) {
    return this.adoptionsService.updateAdoption(adoption);
  }

  @Get()
  async findAll() {
    return this.adoptionsService.findAll();
  }

  @Delete(':id')
  async deleteAdoption(@Param('id') adoptionId: string) {
    return this.adoptionsService.deleteAdoption(adoptionId);
  }
}
