import React from 'react';
import styled from 'styled-components/native';
import { Avatar } from 'react-native-elements';
import { H1 } from '~/components';
import { useAsyncStorage } from '@react-native-community/async-storage';

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Profile = ({ title }) => {
  return (
    <Header>
      <H1>{title}</H1>
      <Wrapper>
        <Avatar
          rounded
          size={16 * 2.2}
          source={{
            uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          }}
        />
      </Wrapper>
    </Header>
  );
}

export default Profile;
