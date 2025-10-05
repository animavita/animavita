import UserRepository from '../../core/application/repositories/user.repository';
import { InjectModel } from '@nestjs/mongoose';
import { MongoUser, UserDocument } from '../mongo/schemas/user.schema';
import { Model } from 'mongoose';
import { Role, User } from '../../core/domain/user/user';
import { Email } from '../../core/domain/email/email';
import Location from '../../core/domain/location/location';

export class MongoUserRepository implements UserRepository {
  constructor(
    @InjectModel(MongoUser.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  private _mapToUser(document: UserDocument): User {
    return User.create({
      id: document.id,
      email: Email.create(document.email),
      password: document.password,
      name: document.name,
      phoneNumber: document.phoneNumber,
      photoUri: document.photoUri,
      role: document.role as Role,
      location: document.location
        ? new Location(
            document.location.coordinates[0],
            document.location.coordinates[1],
          )
        : undefined,
    });
  }

  async getById(id: string): Promise<User> {
    const document = await this.userModel.findById(id);

    if (!document) return null;

    return this._mapToUser(document);
  }

  async getByEmail(email: string): Promise<User> {
    const document = await this.userModel.findOne({ email });

    if (!document) return null;

    return this._mapToUser(document);
  }

  async store(user: User): Promise<void> {
    await this.userModel.findOneAndUpdate(
      { _id: user.id },
      {
        $set: {
          phoneNumber: user.phoneNumber,
          role: user.role,
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
