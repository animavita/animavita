import UserRepository from '../../core/application/repositories/user.repository';
import { InjectModel } from '@nestjs/mongoose';
import { MongoUser, UserDocument } from '../mongo/schemas/user.schema';
import { AnyKeys, Model } from 'mongoose';
import { User } from '../../core/domain/user/user';
import { Email } from '../../core/domain/email/email';
import Location from '../../core/domain/location/location';
import { DatabaseError } from '../../core/application/errors/database-error';
import { UserRole } from '../../core/domain/role/role';
import { UserPhoneNumber } from '../../core/domain/phone-number/phone-number';

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
      phoneNumber: document.phoneNumber
        ? UserPhoneNumber.create(document.phoneNumber)
        : undefined,
      photoUri: document.photoUri,
      role: document.role ? UserRole.create(document.role) : undefined,
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
    try {
      const optionalData: AnyKeys<UserDocument> = {};

      if (user.location) {
        optionalData.location = {
          type: 'Point',
          coordinates: [user.location.longitude, user.location.latitude],
        };
      }

      if (user.role) {
        optionalData.role = user.role.getValue();
      }

      await this.userModel.findOneAndUpdate(
        { _id: user.id },
        {
          $set: {
            phoneNumber: user.phoneNumber ? user.phoneNumber.getValue() : null,
            ...optionalData,
          },
        },
        { new: true },
      );
    } catch (error) {
      throw new DatabaseError('Failed to store user');
    }
  }
}
