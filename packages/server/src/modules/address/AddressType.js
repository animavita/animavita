import { GraphQLObjectType, GraphQLString } from 'graphql';

const AddressType = new GraphQLObjectType({
  name: 'Address',
  description: 'Address data',
  fields: () => ({
    state: {
      type: GraphQLString,
      resolve: address => address.state
    },
    city: {
      type: GraphQLString,
      resolve: address => address.city
    }
  })
});

export default AddressType;
