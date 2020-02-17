import React, {useEffect, useState} from 'react';
import {Platform, AsyncStorage} from 'react-native';
import * as Facebook from 'expo-facebook';
import {NavigationScreenProp, withNavigation} from 'react-navigation';
import FacebookProvider, {Login} from 'react-facebook-sdk';

import {FacebookButton} from '@animavita/ui/social';
import {graphql, useMutation} from '@animavita/relay';

import {changeShowBottomBar} from '../../utils/bottomBar';

import {
  ContinueWithFacebookMutation as ContinueWithFacebookMutationType,
  ContinueWithFacebookMutationResponse,
} from './__generated__/ContinueWithFacebookMutation.graphql';

interface FacebookWebSuccessfulResponse {
  profile: {
    id: string;
    first_name: string;
    last_name: string;
    name: string;
    email: string;
  };
  tokenDetail: {
    accessToken: string;
    data_access_expiration_time: number;
    expiresIn: number;
    graphDomain: string;
    signedRequest: string;
    userID: string;
  };
}

const ContinueWithFacebookMutation = graphql`
  mutation ContinueWithFacebookMutation($input: SaveFacebookUserInput!) {
    SaveFacebookUser(input: $input) {
      error
      user {
        name
      }
      token
    }
  }
`;

const ContinueWithFacebook: React.FC<{navigation: NavigationScreenProp<any>}> = ({navigation}) => {
  const [isSavingPending, saveFacebookUser] = useMutation<ContinueWithFacebookMutationType>(
    ContinueWithFacebookMutation,
  );

  const [fbLoginIsLoading, changeFbLoginLoadingTo] = useState(false);

  useEffect(() => {
    changeShowBottomBar(fbLoginIsLoading);
  }, [fbLoginIsLoading]);

  // TODO: initialize this sooner
  useEffect(() => {
    async function initializeFacebookSDK() {
      try {
        await Facebook.initializeAsync('877731272663210', 'Animavita');
      } catch ({message}) {
        // eslint-disable-next-line no-console
        console.log(`Facebook Login Error: ${message}`);
      }
    }

    Platform.OS !== 'web' && initializeFacebookSDK();
  }, []);

  const onCompleted = async (data: ContinueWithFacebookMutationResponse) => {
    changeFbLoginLoadingTo(false);
    if (data.SaveFacebookUser && data.SaveFacebookUser.token) {
      await AsyncStorage.setItem('token', data.SaveFacebookUser.token);
      navigation.navigate('Home');
    }
  };

  // TODO: show feedback of error
  const onError = error => {
    changeFbLoginLoadingTo(false);
  };

  const loginWithFacebookMobile = async () => {
    // prevent the user from firing too much requests
    if (fbLoginIsLoading) return;

    changeFbLoginLoadingTo(true);

    const response = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile', 'email'],
    });

    if (response.type === 'success') {
      const {token, permissions, expires} = response;

      saveFacebookUser({
        variables: {
          input: {
            token,
            expires,
            permissions,
          },
        },
        onCompleted,
        onError,
      });
    } else {
      changeFbLoginLoadingTo(false);
    }
  };

  const loginWithFacebookWeb = async (data: FacebookWebSuccessfulResponse) => {
    // prevent the user from firing too much requests
    if (fbLoginIsLoading) return;

    changeFbLoginLoadingTo(true);

    saveFacebookUser({
      variables: {
        input: {
          token: data.tokenDetail.accessToken,
          expires: data.tokenDetail.expiresIn,
          permissions: ['public_profile', 'email'],
        },
      },
      onCompleted,
      onError,
    });
  };

  const handleLoginWithFacebookWebError = error => {
    changeFbLoginLoadingTo(false);
  };

  if (Platform.OS === 'web') {
    return (
      <FacebookProvider appId="877731272663210">
        <Login scope="public_profile,email" onResponse={loginWithFacebookWeb} onError={handleLoginWithFacebookWebError}>
          <FacebookButton testID="fb-btn" />
        </Login>
      </FacebookProvider>
    );
  } else {
    return <FacebookButton testID="fb-btn" onPress={loginWithFacebookMobile} />;
  }
};

export default withNavigation(ContinueWithFacebook);
