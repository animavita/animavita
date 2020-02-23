import {graphql} from 'graphql';

import {connectMongoose, disconnectMongoose, restartCounters, gql, getContext} from '../../../../../tests/helpers';
import schema from '../../../../schema';

import {SaveFacebookUserMutationArgs} from '../SaveFacebookUserMutation';

beforeAll(connectMongoose);
beforeEach(restartCounters);
afterAll(disconnectMongoose);

interface MutationVariables {
  input: SaveFacebookUserMutationArgs;
}

const mutation = gql`
  mutation M($input: SaveFacebookUserInput!) {
    SaveFacebookUser(input: $input) {
      clientMutationId
      error
      token
      user {
        name
        emails {
          email
          providedBy
        }
        providerIds {
          id
          providedBy
        }
      }
    }
  }
`;

describe('SaveFacebookUserMutation', () => {
  it('should create a new account if never logged in with facebook before', async () => {
    // mock fetch of UserIncomplete
    // @ts-ignore
    fetch.once(JSON.stringify({id: 'fakeid', name: 'Fake Name', email: 'fakeemail@fake.com'}));

    // mock fetch of user profile
    // @ts-ignore
    fetch.once(JSON.stringify({url: 'https://fakeprofileurl.com'}));

    const rootValue = {};
    const context = await getContext();

    const variables: MutationVariables = {
      input: {
        token: 'somefaketoken',
        expires: 5797,
        permissions: ['email', 'profile'],
      },
    };

    const result = await graphql(schema, mutation, rootValue, context, variables);

    expect(result.errors).toBeUndefined();
    expect(result.data!.SaveFacebookUser.error).toBeNull();
    expect(result.data!.SaveFacebookUser.token).toBeDefined();
    expect(result.data!.SaveFacebookUser.user).toMatchSnapshot();
  });
});
