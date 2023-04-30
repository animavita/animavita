import { AdoptionType, UserType } from '@animavita/models';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdoptionDocument } from './repositories/mongodb/adoption.interface';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/repositories/user-repository.interface';

const RADIUS_OF_EARTH = 63781; // km

type UserEmail = UserType['email'];

@Injectable()
export class AdoptionsService {
  @Inject(UserService)
  private readonly userService: UserRepository;

  constructor(
    @InjectModel('Adoption')
    private readonly adoptionModel: Model<AdoptionDocument>,
  ) {}

  async createAdoption(
    adoption: AdoptionType,
    currentUserEmail: UserEmail,
  ): Promise<AdoptionDocument> {
    const currentUser = await this.userService.findByEmail(currentUserEmail);
    const coordinates = Object.values(currentUser.location);

    const newAdoption = new this.adoptionModel({
      ...adoption,
      location: {
        type: 'Point',
        coordinates,
      },
      user: currentUser.id,
    });

    return await newAdoption.save();
  }

  async updateAdoption(adoption: AdoptionType): Promise<AdoptionType> {
    const target = await this.getAdoptionById(adoption.id);

    if (!target) throw new NotFoundException();

    return await this.adoptionModel.findOneAndUpdate(
      { _id: adoption.id },
      { $set: adoption },
      { new: true },
    );
  }

  async findAll(): Promise<AdoptionType[]> {
    return await this.adoptionModel.find().populate('user', 'name');
  }

  async findNearMe({
    currentUserEmail,
    radius = 1,
  }: {
    currentUserEmail: UserEmail;
    radius: number;
  }): Promise<AdoptionType[]> {
    const currentUser = await this.userService.findByEmail(currentUserEmail);
    const coordinates = Object.values(currentUser.location);
    const finalRadius = radius * 10; // 1.2 = 12km

    return await this.adoptionModel
      .find({
        location: {
          $geoWithin: {
            $centerSphere: [coordinates, finalRadius / RADIUS_OF_EARTH],
          },
        },
      })
      .where('user')
      .ne(currentUser.id)
      .populate('user', 'name location');
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
