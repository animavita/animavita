import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {NavigationScreenProp} from 'react-navigation';

import {useQuery, graphql} from '@animavita/relay';

import {CheckLoginQuery} from './__generated__/CheckLoginQuery.graphql';

const Wrapper = styled.View`
  justify-content: center;
  align-items: center;
  height: 100%;
`;
const Loading = styled.ActivityIndicator``;

const CheckLogin: React.FC<{navigation: NavigationScreenProp<any>}> = ({navigation}) => {
  const {props} = useQuery<CheckLoginQuery>(
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
    if (props && props.me && props.me.name) {
      navigation.navigate('Home');
    } else if (props && !props.me) {
      navigation.navigate('SignUp');
    }
  }, [props]);

  return (
    <Wrapper>
      <Loading />
    </Wrapper>
  );
};

export default CheckLogin;
