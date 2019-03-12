import { mergeResolvers } from "merge-graphql-schemas";

import User from "./User";

const resolvers = [User];

export default mergeResolvers(resolvers);
