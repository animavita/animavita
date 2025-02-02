import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  HydratedDocument,
  ObjectId,
  SchemaTimestampsConfig,
  Types,
  Document,
} from 'mongoose';
import { MongoUser } from './user.schema';
import { MongoLocation } from './location.schema';

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

export type PetDocumentWithUser = Omit<PetDocument, 'user'> & {
  user: Pick<MongoUser, 'name'> & Document<ObjectId>;
};

export const PetSchema = SchemaFactory.createForClass(MongoPet);
