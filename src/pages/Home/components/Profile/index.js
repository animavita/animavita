import React, { Fragment } from 'react';
import { Avatar, Icon, Badge } from 'react-native-elements';
import { H1 } from '~/components';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import {
  ProfileContainer, Salutation, Notification, styles,
} from './styles';
import { withNavigation } from 'react-navigation';
import { THEME_COLORS } from '~/utils/constants';
import useProfile from '~/hooks/useProfile';
import { useSubscription } from 'react-apollo-hooks';
import gql from 'graphql-tag';
const hitSlop = {
  top: 20,
  bottom: 20,
  left: 20,
  right: 20,
};

const NOTIFICATIONS_SUBSCRIPTION = gql`
  subscription onNotificationReceived{
    Notification(filter: {mutation_in:[CREATED]}) {
      node{
        id
        message
      }
    }
    
  } 
  
`;

const MESSAGES_SUBSCRIPTIONS = gql`
  subscription onMessageReceived{
    Message(filter: {mutation_in:[CREATED]}) {
      node{
        id
        message
      }
    }
  }  
`

const NotificationItem = ({
  openScreen, iconName, iconType, badgeStatus, news,
}) => (
  <TouchableOpacity hitSlop={hitSlop} onPress={openScreen}>
    <Icon name={iconName} type={iconType} color={THEME_COLORS.BLACK} size={22} />
    { news ? <Badge status={badgeStatus} containerStyle={styles.badge} /> : null}
  </TouchableOpacity>
);

const Profile = ({ navigation }) => {
  const user = useProfile();
  const { data, error, loading } = useSubscription(NOTIFICATIONS_SUBSCRIPTION);
  return (
    <Fragment>
      <Salutation>
        <H1 size={22}>Olá, </H1>
        <H1>{user.name}</H1>
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
            openScreen={() => navigation.navigate('Messages')}
            iconName="map-pin"
            iconType="feather"
            badgeStatus="error"
          />
  
          <NotificationItem
            openScreen={() => navigation.navigate('Notifications')}
            iconName="bell"
            iconType="feather"
            badgeStatus="success"
            news={ !loading && data.Notification.node ? true : false }
          />
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
}

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
  iconType: PropTypes.string.isRequired,
  badgeStatus: PropTypes.string.isRequired,
  news: PropTypes.bool
};

export default withNavigation(Profile);
