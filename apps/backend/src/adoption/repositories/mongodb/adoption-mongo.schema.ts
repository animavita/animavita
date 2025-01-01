import {
  HydratedDocument,
  ObjectId,
  Document,
  SchemaTimestampsConfig,
  Types,
} from 'mongoose';
import {
  MongoLocation,
  MongoUser,
} from '../../../user/repositories/mongodb/user-mongo.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  AnimalAgesType,
  AnimalGendersType,
  AnimalSizesType,
  AnimalType,
} from '@animavita/types';

@Schema({ timestamps: true, collection: 'pets' })
export class MongoAdoption {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  gender: AnimalGendersType;

  @Prop({ required: true })
  breed: string;

  @Prop({ required: true })
  type: AnimalType;

  @Prop({ required: true })
  age: AnimalAgesType;

  @Prop({ required: true })
  size: AnimalSizesType;

  @Prop()
  observations: string;

  @Prop()
  photos: string[];

  @Prop({ required: true, type: Types.ObjectId, ref: MongoUser.name })
  user: string;

  @Prop()
  location: MongoLocation;
}

export type AdoptionDocument = HydratedDocument<MongoAdoption> &
  SchemaTimestampsConfig;

export type PopulatedAdoptionDocument = Omit<AdoptionDocument, 'user'> & {
  user: Pick<MongoUser, 'name'> & Document<ObjectId>;
};

export const AdoptionSchema = SchemaFactory.createForClass(MongoAdoption);
