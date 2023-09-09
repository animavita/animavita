import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdoptionSchema } from './mongodb/adoption-mongo.schema';
import { AdoptionMongoDBRepository } from './mongodb/adoption-mongo.repository';
import { AdoptionRepository } from './adoption-repository.interface';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Adoption', schema: AdoptionSchema }]),
  ],
  providers: [
    {
      provide: AdoptionRepository,
      useClass: AdoptionMongoDBRepository,
    },
  ],
  exports: [AdoptionRepository],
})
export class AdoptionEntitiesModule {}
