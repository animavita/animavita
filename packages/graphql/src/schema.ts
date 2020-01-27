import {GraphQLObjectType, GraphQLSchema, GraphQLString} from 'graphql';

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: 'The root query',
    fields: () => ({
      hello: {
        type: GraphQLString,
        resolve: () => 'world',
      },
    }),
  }),
});

export default schema;
