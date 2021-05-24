import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

import {changeShowBottomBar} from '../../utils/bottomBar';
import {keys} from '../../utils/asyncStorage';

import {ContinueWithFacebookMutationResponse} from './__generated__/ContinueWithFacebookMutation.graphql';

const useAuth = () => {
  const navigation = useNavigation();
  const [fbLoginIsLoading, changeFbLoginLoadingTo] = useState(false);

  useEffect(() => {
    changeShowBottomBar(fbLoginIsLoading);
  }, [fbLoginIsLoading]);

  const onCompleted = async (data: ContinueWithFacebookMutationResponse) => {
    changeFbLoginLoadingTo(false);
    if (data.SaveFacebookUser && data.SaveFacebookUser.token) {
      await AsyncStorage.setItem(keys.token, data.SaveFacebookUser.token);
      navigation.navigate('Home');
    }
  };

  // TODO: show feedback of error
  const onError = error => {
    changeFbLoginLoadingTo(false);
  };

  return {
    fbLoginIsLoading,
    changeFbLoginLoadingTo,
    onCompleted,
    onError,
  };
};

export default useAuth;
