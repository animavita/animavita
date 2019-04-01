import { mergeTypes } from 'merge-graphql-schemas';

import User from './User/user.schema';
import Auth from './Auth/auth.schema';

const typeDefs = [User, Auth];

export default mergeTypes(typeDefs);
