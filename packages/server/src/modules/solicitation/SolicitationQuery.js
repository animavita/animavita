import mongoose from 'mongoose';
import {
  GraphQLNonNull, GraphQLID, GraphQLList, GraphQLInt
} from 'graphql';
import SolicitationType from './SolicitationType';
import SolicitationModel from './SolicitationModel';

const { ObjectId } = mongoose.Types;

export default {
  solicitations: {
    type: GraphQLList(SolicitationType),
    description: 'Take all solicitation to adopt',
    args: {
      first: {
        name: 'first',
        type: GraphQLInt
      },
      skip: {
        name: 'skip',
        type: GraphQLInt
      }
    },
    // eslint-disable-next-line max-len
    resolve: (_, { first = null, skip = null }, { user }) => SolicitationModel.aggregate([
      {
        $lookup: {
          from: 'adopts',
          localField: 'adopt',
          foreignField: '_id',
          as: 'adopt'
        }
      },
      {
        $unwind: {
          path: '$adopt'
        }
      },
      {
        $match: {
          'adopt.user': ObjectId(user._id),
          accepted: false,
          'adopt.adopted': false
        }
      }
    ])
      .skip(skip)
      .limit(first)
      .sort('-createdAt')
  },
  solicitationByAdopt: {
    type: SolicitationType,
    args: {
      adoptId: {
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve: (_, { adoptId }, { user }) => SolicitationModel.findOne({
      adopt: ObjectId(adoptId),
      user: ObjectId(user._id)
    })
  }
};
