import { GraphQLObjectType, GraphQLFloat, GraphQLNonNull } from 'graphql';

import axios from 'axios';
import UserType from '../modules/user/UserType';
import AddressType from '../modules/address/AddressType';
import AdoptQuery from '../modules/adopt/AdoptQuery';
import ConversationQuery from '../modules/conversation/ConversationQuery';
import MessageQuery from '../modules/message/MessageQuery';
import SolicitationQuery from '../modules/solicitation/SolicitationQuery';

require('dotenv').config();

/* Connect to mongodb */

const { GOOGLE_API_KEY } = process.env;

export default new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all queries',
  fields: () => ({
    me: {
      type: UserType,
      description: 'Return the authenticated user data',
      resolve: (root, args, context) => (context.user ? context.user : null)
    },
    localization: {
      type: AddressType,
      args: {
        latitude: {
          name: 'latitude',
          type: new GraphQLNonNull(GraphQLFloat)
        },
        longitude: {
          name: 'longitude',
          type: new GraphQLNonNull(GraphQLFloat)
        }
      },
      resolve: async (root, { latitude, longitude }) => {
        let state = null;
        let city = null;
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?key=${GOOGLE_API_KEY}&latlng=${latitude},${longitude}&sensor=false`
        );
        response.data.results[0].address_components.forEach((result) => {
          if (result.types.includes('administrative_area_level_2')) {
            city = result.long_name;
          } else if (result.types.includes('administrative_area_level_1')) {
            state = result.long_name;
          }
        });

        return {
          state,
          city
        };
      }
    },
    ...AdoptQuery,
    ...ConversationQuery,
    ...MessageQuery,
    ...SolicitationQuery
  })
});
