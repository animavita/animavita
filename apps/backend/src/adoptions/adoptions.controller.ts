import { AdoptionType } from '@animavita/models';
import {
  adoptionValidationSchema,
  createValidationSchema,
} from '@animavita/validation-schemas';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { JoiValidationPipe } from 'src/pipes/joi-validation-pipe';
import { AdoptionsService } from './adoptions.service';

@Controller('api/v1/adoptions')
export class AdoptionsController {
  constructor(private readonly adoptionsService: AdoptionsService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(createValidationSchema))
  async createAdoption(@Body() adoption: AdoptionType) {
    return this.adoptionsService.createAdoption(adoption);
  }

  @Patch()
  @UsePipes(new JoiValidationPipe(adoptionValidationSchema))
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
