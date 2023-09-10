import { Module } from '@nestjs/common';
import { AdoptionsController } from './adoption.controller';
import { AdoptionsService } from './adoption.service';
import { UserModule } from '../user/user.module';
import { AbilityModule } from '../frameworks/casl/ability.module';

@Module({
  imports: [UserModule, AbilityModule],
  controllers: [AdoptionsController],
  providers: [AdoptionsService],
})
export class AdoptionsModule {}
