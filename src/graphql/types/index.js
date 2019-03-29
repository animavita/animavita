import { mergeTypes } from 'merge-graphql-schemas';

import User from './User';
import Auth from './Auth';

const typeDefs = [User, Auth];

export default mergeTypes(typeDefs);
