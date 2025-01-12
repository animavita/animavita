import { Module } from '@nestjs/common';
import { CaslModule } from 'nest-casl';

import { PetsController } from '../infra/controllers/pets.controller';
import { UserModule } from '../user/user.module';
import { adoptionPermissions } from '../frameworks/casl/permissions/adoption.permissions';
import PostPetForAdoption from '../application/usecases/owner/post-pet-for-adoption/post-pet-for-adoption';
import FindNearestPets from '../application/usecases/adopter/find-nearest-pets/find-nearest-pets';

@Module({
  imports: [
    UserModule,
    CaslModule.forFeature({ permissions: adoptionPermissions }),
  ],
  controllers: [PetsController],
  providers: [PostPetForAdoption, FindNearestPets],
})
export class PetModule {}
