import mongoose from 'mongoose';

import {DataMapper} from '../../../../../graphql/src/shared/DDD';
import {Pet} from '../domain/Pet';

import {IPetSchema} from './mongoose/PetModel';

const PetMapper: DataMapper<Pet.Type, IPetSchema> = {
  toData: (entity: Pet.Type) => ({
    _id: mongoose.Types.ObjectId(entity.id),
    age: entity.age,
    description: entity.description,
    location: entity.location,
    name: entity.name,
    photos: entity.photos,
    size: entity.size,
    gender: entity.gender,
    specie: entity.specie,
  }),
  toEntity: (data: IPetSchema) => ({
    id: data._id.toString(),
    gender: data.gender,
    location: data.location,
    name: data.name,
    photos: data.photos,
    specie: data.specie,
    age: data.age,
    description: data.description,
    size: data.size,
  }),
};

export {PetMapper};
