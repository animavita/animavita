import React, { Fragment } from 'react';
import { Avatar, Icon, Badge } from 'react-native-elements';
import { H1 } from '~/components';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import {
  ProfileContainer, Salutation, Notification, styles,
} from './styles';

import { THEME_COLORS } from '~/utils/constants';

const Profile = ({ navigation, user }) => (
  <Fragment>
    <Salutation>
      <H1 size={22}>Olá, </H1>
      <H1>{user.name}</H1>
    </Salutation>
    <ProfileContainer>
      <Notification>
        <TouchableOpacity onPress={() => console.log('oi')}>
          <Icon name="map-pin" type="feather" color={THEME_COLORS.BLACK} size={22} />
          <Badge status="error" containerStyle={styles.badge} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <Icon name="bell" type="feather" color={THEME_COLORS.BLACK} size={22} />
          <Badge status="success" containerStyle={styles.badge} />
        </TouchableOpacity>
      </Notification>
      <Avatar
        rounded
        onPress={() => navigation.navigate('Settings')}
        size={16 * 2.2}
        source={{
          uri: user.avatar,
        }}
      />
    </ProfileContainer>
  </Fragment>
);

Profile.propTypes = {
  navigation: PropTypes.shape().isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
};

export default Profile;
