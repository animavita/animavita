import { Module } from '@nestjs/common';
import { PetsController } from '../infra/controllers/pets.controller';
import { UserModule } from '../user/user.module';
import PostPetForAdoption from '../application/usecases/owner/post-pet-for-adoption/post-pet-for-adoption';
import FindNearestPets from '../application/usecases/adopter/find-nearest-pets/find-nearest-pets';
import UpdatePostedPet from '../application/usecases/owner/update-posted-pet/update-posted-pet';

@Module({
  imports: [UserModule],
  controllers: [PetsController],
  providers: [PostPetForAdoption, UpdatePostedPet, FindNearestPets],
})
export class PetModule {}
