import { InjectModel } from '@nestjs/mongoose';
import UserSessionRepository from '../../core/application/repositories/user-session.repository';
import { UserSession } from '../../core/domain/user-session/user-session';
import {
  MongoUserSession,
  UserSessionDocument,
} from '../mongo/schemas/user-session.schema';
import { Model, isValidObjectId } from 'mongoose';
import { DatabaseError } from '../../core/application/errors/database-error';

export class MongoUserSessionRepository implements UserSessionRepository {
  constructor(
    @InjectModel(MongoUserSession.name)
    private readonly userSessionModel: Model<UserSessionDocument>,
  ) {}

  async getByUserId(userId: string) {
    if (!isValidObjectId(userId)) return null;

    const document = await this.userSessionModel.findOne({ user: userId });

    if (!document) return null;

    return UserSession.create(
      document.user,
      document.refreshToken,
      document.id,
    );
  }

  async getById(_id: string) {
    if (!isValidObjectId(_id)) return null;

    try {
      const document = await this.userSessionModel.findOne({
        _id,
      });

      if (!document) return null;

      return UserSession.create(
        document.user,
        document.refreshToken,
        document.id,
      );
    } catch (error) {
      throw new DatabaseError('Error retrieving user session by id');
    }
  }

  async store(session: UserSession) {
    try {
      if (session.id && isValidObjectId(session.id)) {
        const result = await this.userSessionModel.findOneAndUpdate(
          { _id: session.id },
          {
            $set: {
              refreshToken: session.refreshToken,
            },
          },
          { new: true },
        );

        if (!result) {
          throw new DatabaseError('Session not found for update');
        }

        return result.id;
      }

      const newDocument = new this.userSessionModel({
        user: session.userId,
        refreshToken: session.refreshToken,
      });

      const doc = await newDocument.save();
      return doc.id;
    } catch (error) {
      throw new DatabaseError('Error storing user session');
    }
  }

  async delete(_id: string): Promise<void> {
    if (!isValidObjectId(_id)) {
      throw new DatabaseError('Invalid session ID');
    }

    try {
      await this.userSessionModel.deleteOne({ _id });
    } catch (error) {
      throw new DatabaseError('Error deleting user session');
    }
  }
}
