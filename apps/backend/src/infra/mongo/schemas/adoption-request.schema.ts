import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTimestampsConfig, Types } from 'mongoose';
import { MongoPet } from './pet.schema';
import { MongoUser } from './user.schema';

@Schema({ timestamps: true, collection: 'adoption-requests' })
export class MongoAdoptionRequest {
  @Prop({ required: true, type: Types.ObjectId, ref: MongoPet.name })
  petId: string;

  @Prop({ required: true, type: Types.ObjectId, ref: MongoUser.name })
  adopterId: string;

  @Prop({ required: true, enum: ['pending', 'accepted', 'denied'] })
  status: 'pending' | 'accepted' | 'denied';
}

export type AdoptionRequestDocument = HydratedDocument<MongoAdoptionRequest> &
  SchemaTimestampsConfig;

export const AdoptionRequestSchema =
  SchemaFactory.createForClass(MongoAdoptionRequest);

AdoptionRequestSchema.index({ petId: 1, adopterId: 1 }, { unique: true });
