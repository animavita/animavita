import { Module } from '@nestjs/common';
import { CaslModule } from 'nest-casl';

import { PetsController } from '../infra/controllers/pets.controller';
import { UserModule } from '../user/user.module';
import { adoptionPermissions } from '../frameworks/casl/permissions/adoption.permissions';
import PostPetForAdoption from '../application/usecases/owner/post-pet-for-adoption/post-pet-for-adoption';
import FindNearestPets from '../application/usecases/adopter/find-nearest-pets/find-nearest-pets';
import UpdatePostedPet from '../application/usecases/owner/update-posted-pet/update-posted-pet';

@Module({
  imports: [
    UserModule,
    CaslModule.forFeature({ permissions: adoptionPermissions }),
  ],
  controllers: [PetsController],
  providers: [PostPetForAdoption, UpdatePostedPet, FindNearestPets],
})
export class PetModule {}
