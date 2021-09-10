import {GraphQLNonNull, GraphQLObjectType, GraphQLObjectTypeConfig, GraphQLString} from 'graphql';
import {globalIdField} from 'graphql-relay';

import {registerType, NodeInterface} from '../../../interfaces/NodeInterface';
import {GraphQLContext} from '../../../types';

export type UserGraphQLType = {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
};

type ConfigType = GraphQLObjectTypeConfig<UserGraphQLType, GraphQLContext>;

const UserTypeConfig: ConfigType = {
  name: 'User',
  description: 'Animavita user',
  fields: () => ({
    id: globalIdField('User', user => user.id),
    name: {
      type: GraphQLNonNull(GraphQLString),
      description: 'The name of the user',
      resolve: user => user.name,
    },
    email: {
      type: GraphQLNonNull(GraphQLString),
      description: "The user's email",
      resolve: user => user.email,
    },
    profileImage: {
      type: GraphQLString,
      description: "The user's profile image ",
      resolve: user => user.profileImage,
    },
  }),
  interfaces: () => [NodeInterface],
};

const UserType = new GraphQLObjectType(UserTypeConfig);

export default registerType(UserType);
