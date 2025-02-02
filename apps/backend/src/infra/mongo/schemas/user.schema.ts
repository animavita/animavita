import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTimestampsConfig } from 'mongoose';
import { MongoLocation } from './location.schema';

@Schema({ timestamps: true, collection: 'users' })
export class MongoUser {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  location: MongoLocation;

  @Prop()
  photoUri: string;
}

export type UserDocument = HydratedDocument<MongoUser> & SchemaTimestampsConfig;

export const UserSchema = SchemaFactory.createForClass(MongoUser);
