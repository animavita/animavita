import { AdoptionType } from '@animavita/models';
import {
  adoptionValidationSchema,
  createValidationSchema,
} from '@animavita/validation-schemas';
import { UseGuards } from '@nestjs/common';
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
import { JoiValidationPipe } from '../pipes/joi-validation-pipe';
import { AdoptionsService } from './adoptions.service';
import { AccessTokenGuard } from 'src/guards/accessToken.guard';

@Controller('api/v1/adoptions')
export class AdoptionsController {
  constructor(private readonly adoptionsService: AdoptionsService) {}
  
  @Post()
  @UseGuards(AccessTokenGuard)
  @UsePipes(new JoiValidationPipe(createValidationSchema))
  async createAdoption(@Body() adoption: AdoptionType) {
    return this.adoptionsService.createAdoption(adoption);
  }

  @Patch()
  @UseGuards(AccessTokenGuard)
  @UsePipes(new JoiValidationPipe(adoptionValidationSchema))
  async updateAdoption(@Body() adoption: AdoptionType) {
    return this.adoptionsService.updateAdoption(adoption);
  }

  @Get()
  @UseGuards(AccessTokenGuard)
  async findAll(): Promise<AdoptionType[]> {
    return this.adoptionsService.findAll();
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  async deleteAdoption(@Param('id') adoptionId: string) {
    return this.adoptionsService.deleteAdoption(adoptionId);
  }
}
