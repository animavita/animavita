import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdoptionSchema } from './mongodb/adoption-mongo.schema';
import { AdoptionMongoDBRepository } from './mongodb/adoption-mongo.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Adoption', schema: AdoptionSchema }]),
  ],
  providers: [
    {
      provide: 'MONGODB',
      useClass: AdoptionMongoDBRepository,
    },
  ],
  exports: ['MONGODB'],
})
export class AdoptionEntitiesModule {}
