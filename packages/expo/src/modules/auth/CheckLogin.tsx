import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useLazyLoadQuery, graphql} from '@animavita/relay';

import LoadingScreen from '../common/LoadingScreen';

import {CheckLoginQuery} from './__generated__/CheckLoginQuery.graphql';

const CheckLogin: React.FC = () => {
  const navigation = useNavigation();

  const {me} = useLazyLoadQuery<CheckLoginQuery>(
    graphql`
      query CheckLoginQuery {
        me {
          name
        }
      }
    `,
    {},
    {
      fetchPolicy: 'network-only',
    },
  );

  useEffect(() => {
    if (me && me.name) {
      navigation.navigate('Home');
    } else if (!me) {
      navigation.navigate('SignUp');
    }
  }, [me]);

  return <LoadingScreen />;
};

export default CheckLogin;
