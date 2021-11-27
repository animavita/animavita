import mongoose from 'mongoose';

import {Pet} from '../../domain/Pet';
import {PetsRepository} from '../../domain/PetsRepository';
import {PetMapper} from '../PetMapper';

import {PetModel} from './PetModel';

const mongoPetsRepository = (): PetsRepository => ({
  getNextUUID() {
    return mongoose.Types.ObjectId().toString();
  },

  async store(pet: Pet.Type): Promise<Pet.Type> {
    const {_id = '', ...petData} = PetMapper.toData(pet);
    const petExists = (await PetModel.count({_id})) > 0;
    if (petExists) {
      await PetModel.updateOne({_id}, {$set: petData});
    } else {
      await PetModel.create(petData);
    }

    return pet;
  },
});

export {mongoPetsRepository};
