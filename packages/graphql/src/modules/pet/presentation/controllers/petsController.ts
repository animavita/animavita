import container from '../../../../shared/container';
import {RegisterPetDTO} from '../../app/registerPet';

const petsController = {
  async create(data: RegisterPetDTO) {
    const registerPet = container.cradle.registerPet;

    const pet = await registerPet(data);

    return {pet};
  },
};

export {petsController};
