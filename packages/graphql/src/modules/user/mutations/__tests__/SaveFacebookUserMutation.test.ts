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
    global.fetch
      // mock fetch of UserIncomplete
      .once(JSON.stringify({id: 'fakeid', name: 'Fake Name', email: 'fakeemail@fake.com'}))
      // mock fetch of user profile
      .once('fakeimage', {url: 'https://fakeprofileurl.com'});

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

    global.fetch
      // mock fetch of UserIncomplete
      .once(JSON.stringify({id: 'facebookfakeid', name: 'Fake Loooooooonger Name', email: 'fakeemail@fake.com'}))
      // mock fetch of user profile
      .once('fakeimage', {url: 'https://fakeprofileurl.com'});

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

  it('calls fetch with facebook user ID and access token', async () => {
    await new UserModel({
      emails: [
        {
          email: 'fakeemail@fake.com',
          providedBy: 'facebook',
        },
      ],
      ids: [
        {
          id: 'facebookfakeid',
          providedBy: 'facebook',
        },
      ],
      name: 'Fake Short Name',
      profileImages: [
        {
          key: '12hsa',
          location: 'http://s3.com/fake.png',
          originUri: 'http://fb.static.com/fake.png',
          providedBy: 'facebook',
        },
      ],
    } as IUser).save();

    global.fetch
      // mock fetch of UserIncomplete
      .once(JSON.stringify({id: '98712541212', name: 'Fake Loooooooonger Name', email: 'fakeemail@fake.com'}))
      // mock fetch of user profile
      .once('fakeimage', {url: 'https://fakeprofileurl.com'});

    const rootValue = {};
    const context = await getContext();

    const variables: MutationVariables = {
      input: {
        token: 'somefaketoken',
        expires: 5797,
        permissions: ['email', 'profile'],
      },
    };

    await graphql(schema, mutation, rootValue, context, variables);

    expect(global.fetch).toHaveBeenLastCalledWith(
      `https://graph.facebook.com/98712541212/picture?height=720&width=720&access_token=somefaketoken`,
    );
  });
});
