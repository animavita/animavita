import React, { Fragment } from 'react';
import { Avatar, Icon, Badge } from 'react-native-elements';
import { H1 } from '~/components';
import { useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';

import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { THEME_COLORS } from '~/utils/constants';
import { sanitizeUsername } from '~/utils/helpers';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {
  ProfileContainer, Salutation, Notification, styles, NotificationButton,
} from './styles';

const hitSlop = {
  top: 5,
  bottom: 5,
  left: 5,
  right: 5,
};

/*
const NOTIFICATIONS_SUBSCRIPTION = gql`
  subscription onNotificationReceived {
    Notification(filter: { mutation_in: [CREATED] }) {
      node {
        id
        message
      }
    }
  }
`;

*/

const NotificationItem = ({
  openScreen, iconName, iconType, badgeStatus, news, color,
}) => (
  <NotificationButton hitSlop={hitSlop} onPress={openScreen}>
    <Icon name={iconName} type={iconType} color={color} size={hp('3.5%')} />
    {news ? <Badge status={badgeStatus} containerStyle={styles.badge} /> : null}
  </NotificationButton>
);

const Profile = ({ navigation }) => {
  const user = useSelector(state => state.auth);
  const username = sanitizeUsername(user.name);

  // const { data, error, loading } = useSubscription(NOTIFICATIONS_SUBSCRIPTION);

  return (
    <Fragment>
      <Salutation>
        <H1 size={3.5}>{`Olá, ${username}`}</H1>
      </Salutation>
      <ProfileContainer>
        <Notification>
          <NotificationItem
            openScreen={() => navigation.navigate('Messages')}
            iconName="mail"
            iconType="feather"
            badgeStatus="primary"
          />

          <NotificationItem
            openScreen={() => showMessage({
              message: 'Lamento deixá-lo curioso!',
              description: 'Porém, ainda estamos trabalhando nessa funcionalidade!',
              type: 'info',
            })
            }
            iconName="map-pin"
            iconType="feather"
            color={THEME_COLORS.GREY}
            badgeStatus="error"
          />

          <NotificationItem
            openScreen={() => navigation.navigate('Notifications')}
            iconName="bell"
            iconType="feather"
            badgeStatus="success"
          />
        </Notification>
        <Avatar
          rounded
          onPress={() => navigation.navigate('Settings')}
          size={hp('5%')}
          source={{
            uri: user.avatar,
          }}
        />
      </ProfileContainer>
    </Fragment>
  );
};

Profile.propTypes = {
  navigation: PropTypes.shape().isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
  }),
};

Profile.defaultProps = {
  user: {
    name: '',
    avatar: '',
  },
};

NotificationItem.propTypes = {
  openScreen: PropTypes.func.isRequired,
  iconName: PropTypes.string.isRequired,
  color: PropTypes.string,
  iconType: PropTypes.string.isRequired,
  badgeStatus: PropTypes.string.isRequired,
  news: PropTypes.bool,
};

NotificationItem.defaultProps = {
  news: false,
  color: THEME_COLORS.BLACK,
};
export default withNavigation(Profile);
