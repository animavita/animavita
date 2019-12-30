import {
  LoginManager, AccessToken, GraphRequest, GraphRequestManager
} from 'react-native-fbsdk';

import AsyncStorage from '@react-native-community/async-storage';

const getAccessData = async () => {
  let accessData;
  let result;

  const offlineUser = await AsyncStorage.getItem('@facebook:accessData');
  if (offlineUser) {
    accessData = JSON.parse(offlineUser);
  } else {
    result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
      return { error: 'Usuário cancelou o Login!' };
    }

    accessData = await AccessToken.getCurrentAccessToken();
    await AsyncStorage.setItem('@facebook:accessData', JSON.stringify(accessData));
  }

  return accessData;
};

const getAccountInfo = accessData => new Promise((resolve, reject) => {
  new GraphRequestManager()
    .addRequest(
      new GraphRequest(
        '/me',
        {
          accessToken: accessData.accessToken,
          parameters: {
            fields: {
              string: 'id, name, email, picture.type(large)'
            }
          }
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }

          return resolve(result);
        },
      ),
    )
    .start();
});

export const handleLoginFacebook = async () => {
  let accessData;

  try {
    accessData = await getAccessData();

    const info = await getAccountInfo(accessData);

    return { user: info };
  } catch (err) {
    await AsyncStorage.removeItem('@facebook:accessData');
    return { error: 'Houve um erro ao recuperar os dados!' };
  }
};
