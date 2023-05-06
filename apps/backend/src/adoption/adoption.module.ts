import { Module } from '@nestjs/common';
import { AdoptionsController } from './adoption.controller';
import { AdoptionsService } from './adoption.service';
import { UserModule } from '../user/user.module';
import { AdoptionEntitiesModule } from './repositories/adoption-repository.module';

@Module({
  imports: [AdoptionEntitiesModule, UserModule],
  controllers: [AdoptionsController],
  providers: [AdoptionsService],
})
export class AdoptionsModule {}
