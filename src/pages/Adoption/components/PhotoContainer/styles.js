import styled from 'styled-components/native';
import { THEME_COLORS } from '~/utils/constants';

export const Container = styled.View`
  margin-top: ${16 * 0.7};
  max-height: 78%;
  height: 78%;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
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
  border-radius: 5px;
`;

export const DrawImage = styled.Image`
  width: 300px;
  height: 300px;
`;
