import { Module } from '@nestjs/common';
import { AdoptionsController } from './adoption.controller';
import { AdoptionsService } from './adoption.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AdoptionsController],
  providers: [AdoptionsService],
})
export class AdoptionsModule {}
