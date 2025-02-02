import { InjectModel } from '@nestjs/mongoose';
import UserSessionRepository from '../../core/application/repositories/user-session.repository';
import { UserSession } from '../../core/domain/user-session/user-session';
import {
  MongoUserSession,
  UserSessionDocument,
} from '../mongo/schemas/user-session.schema';
import { Model, isValidObjectId } from 'mongoose';

export class MongoUserSessionRepository implements UserSessionRepository {
  constructor(
    @InjectModel(MongoUserSession.name)
    private readonly userSessionModel: Model<UserSessionDocument>,
  ) {}

  async getByUserId(userId: string) {
    if (!isValidObjectId(userId)) return null;

    const document = await this.userSessionModel.findOne({ user: userId });

    if (!document) return null;

    return UserSession.create(document.user, document.refreshToken);
  }

  async store(session: UserSession) {
    const newDocument = new this.userSessionModel({
      user: session.userId,
      refreshToken: session.refreshToken,
    });

    await newDocument.save();
  }
}
