import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const ProfileContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Notification = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 0 20px;
`;

export const NotificationButton = styled.TouchableOpacity`
  margin: 0 10px;
`;

export const Salutation = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const styles = StyleSheet.create({
  badge: { position: 'absolute', top: -4, right: -4 },
});
