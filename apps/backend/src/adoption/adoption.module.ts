import { Module } from '@nestjs/common';
import { CaslModule } from 'nest-casl';

import { AdoptionsController } from './adoption.controller';
import { AdoptionsService } from './adoption.service';
import { UserModule } from '../user/user.module';
import { adoptionPermissions } from '../frameworks/casl/permissions/adoption.permissions';

@Module({
  imports: [
    UserModule,
    CaslModule.forFeature({ permissions: adoptionPermissions }),
  ],
  controllers: [AdoptionsController],
  providers: [AdoptionsService],
})
export class AdoptionsModule {}
