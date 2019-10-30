import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { THEME_COLORS } from '~/utils/constants';

export const Container = styled.View`
  max-height: 78%;
  height: 78%;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
`;

export const Box = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 95%;
  margin-top: 20px;
`;

export const Photo = styled.TouchableOpacity`
  width: 80px;
  height: 80px;
  border-width: 1;
  border-style: dashed;
  border-color: ${THEME_COLORS.SECONDARY};
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;

export const PhotoSource = styled.Image`
  width: 80px;
  height: 80px;
  z-index: -1;
  border-radius: 5px;
`;

export const Wrapper = styled.View``;

export const DrawImage = styled.Image`
  width: 300px;
  height: 280px;
`;

export const Footer = styled.View`
  align-items: center;
  width: 100%;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 8px;
`;

export const styles = StyleSheet.create({
  exclude: {
    position: 'absolute',
    zIndex: 10,
    top: -14,
    right: -7,
  },
});
