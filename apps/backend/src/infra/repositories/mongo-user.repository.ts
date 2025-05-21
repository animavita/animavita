import UserRepository from '../../core/application/repositories/user.repository';
import { InjectModel } from '@nestjs/mongoose';
import { MongoUser, UserDocument } from '../mongo/schemas/user.schema';
import { Model } from 'mongoose';
import { User } from '../../core/domain/user/user';

export class MongoUserRepository implements UserRepository {
  constructor(
    @InjectModel(MongoUser.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async getById(id: string): Promise<User> {
    const document = await this.userModel.findById(id);

    if (!document) return null;

    return User.create({
      id: document.id,
      email: document.email,
      password: document.password,
      name: document.name,
      phoneNumber: document.phoneNumber,
      photoUri: document.photoUri,
      location: document.location
        ? {
            longitude: document.location.coordinates[0],
            latitude: document.location.coordinates[1],
          }
        : undefined,
    });
  }

  async getByEmail(email: string): Promise<User> {
    const document = await this.userModel.findOne({ email });

    if (!document) return null;

    return User.create({
      id: document.id,
      email: document.email,
      password: document.password,
      name: document.name,
      phoneNumber: document.phoneNumber,
      photoUri: document.photoUri,
      location: document.location
        ? {
            longitude: document.location.coordinates[0],
            latitude: document.location.coordinates[1],
          }
        : undefined,
    });
  }

  async store(user: User): Promise<void> {
    await this.userModel.findOneAndUpdate(
      { _id: user.id },
      {
        $set: {
          phoneNumber: user.phoneNumber,
          location: {
            type: 'Point',
            coordinates: [user.location.longitude, user.location.latitude],
          },
        },
      },
      { new: true },
    );
  }
}
