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

  @Prop({
    required: true,
    enum: ['pending', 'accepted', 'denied', 'cancelled'],
  })
  status: 'pending' | 'accepted' | 'denied' | 'cancelled';

  @Prop({
    required: false,
    default: null,
    enum: ['rejected_by_owner', 'pet_adopted', 'pet_removed', null],
  })
  denialReason?: 'rejected_by_owner' | 'pet_adopted' | 'pet_removed' | null;
}

export type AdoptionRequestDocument = HydratedDocument<MongoAdoptionRequest> &
  SchemaTimestampsConfig;

export const AdoptionRequestSchema =
  SchemaFactory.createForClass(MongoAdoptionRequest);

AdoptionRequestSchema.index({ petId: 1, adopterId: 1 }, { unique: true });
