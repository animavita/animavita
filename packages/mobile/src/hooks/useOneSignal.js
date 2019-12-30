import { useEffect, useState } from 'react';
import OneSignal from 'react-native-onesignal';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { ONE_SIGNAL_APP_KEY } from '~/utils/constants';

const USER_SAVE_PUSH_TOKEN = gql`
  mutation SaveUserPushTokenMutation($token: String!, $playerId: String!) {
    SaveUserPushTokenMutation(input: { token: $token, playerId: $playerId }) {
      userToken {
        token
        playerId
      }
    }
  }
`;

const useOneSignal = () => {
  const [token, tokenSave] = useState(false);
  const [savePushToken] = useMutation(USER_SAVE_PUSH_TOKEN, {
    onCompleted: () => {
      tokenSave(true);
    }
  });

  function onIds(device) {
    if (!token) {
      savePushToken({
        variables: {
          token: device.pushToken,
          playerId: device.userId
        }
      });
    }
  }
  useEffect(() => {
    OneSignal.init(ONE_SIGNAL_APP_KEY);
    OneSignal.inFocusDisplaying(0);
    OneSignal.addEventListener('ids', onIds);
    return () => {
      OneSignal.removeEventListener('ids', this.onIds);
    };
  });
};

export default useOneSignal;
