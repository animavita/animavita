import { mergeResolvers } from 'merge-graphql-schemas';

import User from './User';
import Auth from './Auth';

const resolvers = [User, Auth];

export default mergeResolvers(resolvers);
