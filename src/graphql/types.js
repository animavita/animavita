import { mergeTypes } from 'merge-graphql-schemas';

import Auth from './Auth/schema.gql';
import User from './User/schema.gql';

const typeDefs = [Auth, User];

export default mergeTypes(typeDefs);
