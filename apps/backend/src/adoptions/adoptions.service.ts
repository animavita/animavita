import { AdoptionType } from '@animavita/models';
import { Injectable, NotFoundException } from '@nestjs/common';
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
    const target = await this.getAdoptionById(adoption.id);

    if (!target) throw new NotFoundException();

    return await this.adoptionModel.findOneAndUpdate(
      { _id: adoption.id },
      { $set: adoption },
      { new: true },
    );
  }

  async findAll(): Promise<AdoptionType[]> {
    return await this.adoptionModel.find();
  }

  async deleteAdoption(adoptionId: string) {
    const target = await this.getAdoptionById(adoptionId);

    if (!target) throw new NotFoundException();

    await this.adoptionModel.deleteOne({ _id: adoptionId }).exec();

    return target;
  }

  private async getAdoptionById(_id: string) {
    return this.adoptionModel.findOne({ _id }).exec();
  }
}
