import {asFunction, AwilixContainer} from 'awilix';

import {registerPet} from './app/registerPet';
import {PetsRepository} from './domain/PetsRepository';
import {mongoPetsRepository} from './infra/mongoose/mongoPetsRepository';

type Container = {
  registerPet: ReturnType<typeof registerPet>;
  petsRepository: PetsRepository;
};

const register = (container: AwilixContainer) =>
  container.register({
    registerPet: asFunction(registerPet),
    petsRepository: asFunction(mongoPetsRepository).singleton(),
  });

export {register, Container};
