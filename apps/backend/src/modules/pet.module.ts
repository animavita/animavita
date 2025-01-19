import { Module } from '@nestjs/common';
import { PetsController } from '../infra/controllers/pets.controller';
import { UserModule } from './user.module';
import PostPetForAdoption from '../core/application/usecases/owner/post-pet-for-adoption/post-pet-for-adoption';
import FindNearestPets from '../core/application/usecases/adopter/find-nearest-pets/find-nearest-pets';
import UpdatePostedPet from '../core/application/usecases/owner/update-posted-pet/update-posted-pet';
import RemovePostedPet from '../core/application/usecases/owner/remove-posted-pet/remove-posted-pet';

@Module({
  imports: [UserModule],
  controllers: [PetsController],
  providers: [
    PostPetForAdoption,
    UpdatePostedPet,
    RemovePostedPet,
    FindNearestPets,
  ],
})
export class PetModule {}
