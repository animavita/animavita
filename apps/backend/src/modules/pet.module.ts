import { Module } from '@nestjs/common';
import { CaslModule } from 'nest-casl';

import { PetsController } from '../infra/controllers/pets.controller';
import { UserModule } from '../user/user.module';
import { adoptionPermissions } from '../frameworks/casl/permissions/adoption.permissions';
import PostPetForAdoption from '../usecases/owner/post-pet-for-adoption';

@Module({
  imports: [
    UserModule,
    CaslModule.forFeature({ permissions: adoptionPermissions }),
  ],
  controllers: [PetsController],
  providers: [PostPetForAdoption],
})
export class PetModule {}
