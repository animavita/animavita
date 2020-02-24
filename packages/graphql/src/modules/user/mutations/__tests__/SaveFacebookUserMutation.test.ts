import {graphql} from 'graphql';

import {
  connectMongoose,
  disconnectMongoose,
  gql,
  getContext,
  clearDbAndRestartCounters,
} from '../../../../../tests/helpers';
import schema from '../../../../schema';

import {SaveFacebookUserMutationArgs} from '../SaveFacebookUserMutation';
import UserModel, {IUser} from '../../UserModel';

beforeAll(connectMongoose);
beforeEach(clearDbAndRestartCounters);
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
        profileImages {
          url
          providedBy
        }
      }
    }
  }
`;

describe('SaveFacebookUserMutation', () => {
  it('should create a new account if never logged in with facebook before', async () => {
    // mock fetch of UserIncomplete
    global.fetch.once(JSON.stringify({id: 'fakeid', name: 'Fake Name', email: 'fakeemail@fake.com'}));

    // mock fetch of user profile
    global.fetch.once(JSON.stringify({url: 'https://fakeprofileurl.com'}));

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

  it('should add facebook info if user already logged in with another provider (and update name if its longer)', async () => {
    await new UserModel({
      emails: [
        {
          email: 'fakeemail@fake.com',
          providedBy: 'google',
        },
      ],
      ids: [
        {
          id: 'googlefakeid',
          providedBy: 'google',
        },
      ],
      name: 'Fake Short Name',
    } as IUser).save();

    // mock fetch of UserIncomplete
    global.fetch.once(
      JSON.stringify({id: 'facebookfakeid', name: 'Fake Loooooooonger Name', email: 'fakeemail@fake.com'}),
    );

    // mock fetch of user profile
    global.fetch.once(JSON.stringify({url: 'https://fakeprofileurl.com'}));

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
