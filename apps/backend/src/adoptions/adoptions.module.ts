import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdoptionSchema } from './adoption.schema';
import { AdoptionsController } from './adoptions.controller';
import { AdoptionsService } from './adoptions.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Adoption', schema: AdoptionSchema }]),
    UserModule,
  ],
  controllers: [AdoptionsController],
  providers: [AdoptionsService],
})
export class AdoptionsModule {}
