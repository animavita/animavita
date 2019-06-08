import { mergeResolvers } from 'merge-graphql-schemas';

import Auth from './Auth/resolvers';
import User from './User/resolvers';

const resolvers = [Auth, User];

export default mergeResolvers(resolvers);
