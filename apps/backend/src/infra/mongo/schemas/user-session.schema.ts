import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTimestampsConfig, Types } from 'mongoose';
import { MongoUser } from './user.schema';

@Schema({ timestamps: true, collection: 'sessions' })
export class MongoUserSession {
  @Prop({ required: true, type: Types.ObjectId, ref: MongoUser.name })
  user: string;

  @Prop()
  refreshToken: string;
}

export type UserSessionDocument = HydratedDocument<MongoUserSession> &
  SchemaTimestampsConfig;

export const UserSessionSchema = SchemaFactory.createForClass(MongoUserSession);
