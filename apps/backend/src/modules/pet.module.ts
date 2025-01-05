import { Module } from '@nestjs/common';
import { CaslModule } from 'nest-casl';

import { PetsController } from '../infra/controllers/pets.controller';
import { UserModule } from '../user/user.module';
import { adoptionPermissions } from '../frameworks/casl/permissions/adoption.permissions';
import PostPetForAdoption from '../usecases/owner/post-pet-for-adoption/post-pet-for-adoption';
import GetPet from '../usecases/owner/get-pet/get-pet';

@Module({
  imports: [
    UserModule,
    CaslModule.forFeature({ permissions: adoptionPermissions }),
  ],
  controllers: [PetsController],
  providers: [PostPetForAdoption, GetPet],
})
export class PetModule {}
