import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import {FacebookButton} from '@animavita/ui/social';
import {graphql, useMutation} from '@animavita/relay';

import getEnvVars from '../../../environment';

import {ContinueWithFacebookMutation as ContinueWithFacebookMutationType} from './__generated__/ContinueWithFacebookMutation.graphql';
import useAuth from './useAuth';

const {fbAppID} = getEnvVars();

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

interface FacebookWebSuccessfulResponse {
  accessToken: string;
  expiresIn: number;
}

const ContinueWithFacebookLoginWeb: React.FC = () => {
  const {changeFbLoginLoadingTo, fbLoginIsLoading, onCompleted, onError} = useAuth();
  const [, saveFacebookUser] = useMutation<ContinueWithFacebookMutationType>(ContinueWithFacebookMutation);

  const loginWithFacebookWeb = async (data: FacebookWebSuccessfulResponse) => {
    // prevent the user from firing too much requests
    if (fbLoginIsLoading) return;

    changeFbLoginLoadingTo(true);

    saveFacebookUser({
      variables: {
        input: {
          token: data.accessToken,
          expires: data.expiresIn,
          permissions: ['public_profile', 'email'],
        },
      },
      onCompleted,
      onError,
    });
  };

  return (
    <FacebookLogin
      appId={fbAppID}
      fields="email"
      callback={loginWithFacebookWeb}
      render={renderProps => <FacebookButton testID="fb-btn" onPress={renderProps.onClick} />}
    />
  );
};

export default ContinueWithFacebookLoginWeb;
