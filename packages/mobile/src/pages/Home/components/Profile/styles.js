import { StyleSheet } from 'react-native';
import styled from 'styled-components';

export const ProfileContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Notification = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 20px;
  width: 105;
`;

export const Salutation = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const styles = StyleSheet.create({
  badge: { position: 'absolute', top: -4, right: -4 }
});
