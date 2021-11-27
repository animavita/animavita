// import {connectionFromPromisedArray} from 'graphql-relay';

// import AdoptModel from './AdoptionModel';

// const adoption = (_, args) => connectionFromPromisedArray(AdoptModel.find().populate('user') as any, args);

// const myAdoptions = (_, __, context) => {
//   return AdoptModel.where('user')
//     .equals(context.user?._id)
//     .populate('user');
// };

// const AdoptionResolvers = {
//   adoption,
//   myAdoptions,
// };

// export default AdoptionResolvers;
