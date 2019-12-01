import React from 'react';
import styled from 'styled-components/native';
import { Avatar } from 'react-native-elements';
import PropTypes from 'prop-types';
import { H1 } from '~/components';
import { useSelector } from 'react-redux';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
  const user = useSelector(state => state.auth);

  return (
    <Header>
      <H1 size={4}>{title}</H1>
      <Wrapper>
        <Avatar
          rounded
          size={hp('5%')}
          source={{
            uri: user.avatar,
          }}
        />
      </Wrapper>
    </Header>
  );
};

Profile.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Profile;
