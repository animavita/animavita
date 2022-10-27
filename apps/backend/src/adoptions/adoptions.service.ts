import { AdoptionType } from '@animavita/models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAdoption } from './adoptions.interface';

@Injectable()
export class AdoptionsService {
  constructor(
    @InjectModel('Adoption') private readonly adoptionModel: Model<IAdoption>,
  ) {}

  async createAdoption(adoption: AdoptionType): Promise<IAdoption> {
    const newAdoption = new this.adoptionModel(adoption);

    return await newAdoption.save();
  }

  async updateAdoption(adoption: AdoptionType): Promise<IAdoption> {
    return this.adoptionModel.findByIdAndUpdate(
      adoption._id,
      {
        $set: adoption,
      },
      { new: true },
    );
  }

  async findAll(): Promise<AdoptionType[]> {
    return await this.adoptionModel.find();
  }

  async deleteAdoption(adoptionId: string) {
    return await this.adoptionModel.findByIdAndDelete(adoptionId);
  }
}
3;
