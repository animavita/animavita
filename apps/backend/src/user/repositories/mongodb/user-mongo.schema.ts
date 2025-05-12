import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTimestampsConfig } from 'mongoose';

export class MongoLocation {
  @Prop({ enum: ['Point'], default: 'Point' })
  type: string;

  @Prop({ required: true })
  coordinates: number[];
}

@Schema({ timestamps: true, collection: 'users' })
export class MongoUser {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  location: MongoLocation;

  @Prop()
  photoUri: string;

  @Prop()
  refreshToken: string;
}

export type UserDocument = HydratedDocument<MongoUser> & SchemaTimestampsConfig;

export const UserSchema = SchemaFactory.createForClass(MongoUser);
