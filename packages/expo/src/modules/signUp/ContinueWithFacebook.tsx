import React, {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import * as Facebook from 'expo-facebook';

import {FacebookButton} from '@animavita/ui/social';
import {graphql, useMutation} from '@animavita/relay';

import {ContinueWithFacebookMutation as ContinueWithFacebookMutationType} from './__generated__/ContinueWithFacebookMutation.graphql';

const ContinueWithFacebookMutation = graphql`
  mutation ContinueWithFacebookMutation($input: SaveFacebookUserInput!) {
    SaveFacebookUser(input: $input) {
      error
      user {
        name
      }
    }
  }
`;

const ContinueWithFacebook: React.FC = () => {
  const [isSavingPending, saveFacebookUser] = useMutation<ContinueWithFacebookMutationType>(
    ContinueWithFacebookMutation,
  );

  const [fbLoginIsLoading, changeFbLoginLoadingTo] = useState(false);

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

  const loginWithFacebookMobile = async () => {
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
        onCompleted: () => {
          changeFbLoginLoadingTo(false);
        },
      });
    } else {
      changeFbLoginLoadingTo(false);
    }
  };

  // TODO: implement login with facebook on web
  const loginWithFacebookWeb = async () => null;

  const handleFacebookLogin = async () => {
    // prevent the user from firing too much requests
    if (fbLoginIsLoading) return;

    if (Platform.OS !== 'web') {
      await loginWithFacebookMobile();
    } else {
      await loginWithFacebookWeb();
    }
  };

  return <FacebookButton testID="fb-btn" onPress={handleFacebookLogin} />;
};

export default ContinueWithFacebook;
