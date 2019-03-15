import { mergeTypes } from 'merge-graphql-schemas';

import User from './User';

const typeDefs = [User];

export default mergeTypes(typeDefs);
