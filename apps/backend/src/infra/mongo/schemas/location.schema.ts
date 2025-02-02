import { Prop } from '@nestjs/mongoose';

export class MongoLocation {
  @Prop({ enum: ['Point'], default: 'Point' })
  type: string;

  @Prop({ required: true })
  coordinates: number[];
}
