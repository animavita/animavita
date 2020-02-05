import {GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLObjectTypeConfig, GraphQLString} from 'graphql';
import {globalIdField} from 'graphql-relay';

import {registerType, NodeInterface} from '../../interfaces/NodeInterface';
import User from './UserLoader';
import {GraphQLContext} from '../../types';

type ConfigType = GraphQLObjectTypeConfig<User, GraphQLContext>;

const UserTypeConfig: ConfigType = {
  name: 'User',
  description: 'Animavita user',
  fields: () => ({
    id: globalIdField('User', user => user._id),
    _id: {
      type: GraphQLNonNull(GraphQLID),
      description: 'MongoDB _id',
      resolve: user => user._id.toString(),
    },
    name: {
      type: GraphQLNonNull(GraphQLString),
      description: 'The name of the user',
      resolve: user => user.name,
    },
  }),
  interfaces: () => [NodeInterface],
};

const UserType = new GraphQLObjectType(UserTypeConfig);

export default registerType(UserType);
