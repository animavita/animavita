import {connectionFromPromisedArray} from 'graphql-relay';

import AdoptModel, {IAdoption} from './AdoptionModel';

const adoption = (_, args) => connectionFromPromisedArray(AdoptModel.find().populate('user') as any, args);

const myAdoptions = (_, __, context) => {
  return AdoptModel.where('user')
    .equals(context.user?._id)
    .populate('user');
};

const createAdoption = ({animal}, {user}) => {
  if (!user?.id) {
    throw new Error('Could not find the User');
  }

  const adoptionModel: IAdoption = {
    name: animal.name,
    size: animal.size,
    age: animal.age,
    user: user?.id,
    gender: animal.gender,
    breed: animal.breed,
    type: animal.type,
    observations: animal.observations,
    photos: animal.photos,
  };
  return AdoptModel.create(adoptionModel);
};

const AdoptionResolvers = {
  adoption,
  myAdoptions,
  createAdoption,
};

export default AdoptionResolvers;
