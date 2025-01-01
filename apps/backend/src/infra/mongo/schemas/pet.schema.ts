import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTimestampsConfig, Types } from 'mongoose';
import {
  MongoLocation,
  MongoUser,
} from '../../../user/repositories/mongodb/user-mongo.schema';

@Schema({ timestamps: true, collection: 'pets' })
export class MongoPet {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  gender: 'male' | 'female';

  @Prop({ required: true })
  breed: string;

  @Prop({ required: true })
  type: 'dog' | 'cat' | 'other';

  @Prop({ required: true })
  age: 'puppy' | 'young' | 'adult' | 'senior';

  @Prop({ required: true })
  size: 'small' | 'medium' | 'big';

  @Prop()
  observations: string;

  @Prop()
  photos: string[];

  @Prop({ required: true, type: Types.ObjectId, ref: MongoUser.name })
  user: string;

  @Prop()
  location: MongoLocation;
}

export type PetDocument = HydratedDocument<MongoPet> & SchemaTimestampsConfig;

export const PetSchema = SchemaFactory.createForClass(MongoPet);
