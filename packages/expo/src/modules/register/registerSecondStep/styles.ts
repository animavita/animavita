import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {px2ddp} from '@animavita/theme';

interface Props {
  onPress: (event: Event) => void;
}

export const Wrapper = styled.KeyboardAvoidingView`
  margin: 0px ${px2ddp(10)}px;
`;

export const Header = styled.View`
  background-color: #f9fafc;
  border-color: #dde3d0;
  padding-top: 34px;
`;
export const TitleImageView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ImageContainer = styled.View`
  display: flex;
  margin-top: -10px;
`;
export const CameraButton = styled(TouchableOpacity)<Props>`
  background-color: rgba(255, 255, 255, 0.5);
  border-style: dashed;
  border-color: #17d4b4;
  border-width: 1.4px;
  border-radius: 10px;
  height: 92px;
  width: 102px;
  justify-content: center;
  align-items: center;
  margin-bottom: 22px;
  margin-top: 5px;
`;
export const ErrorView = styled.View`
  margin-top: -10px;
`;
export const TextError = styled.Text`
  color: #c53030;
`;
export const UploadedImagesContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;
export const Image = styled.Image`
  height: 300px;
  width: 300px;
  align-self: center;
`;
export const UploadedImage = styled.Image`
  border-width: 1.4px;
  border-radius: 10px;
  height: 92px;
  width: 102px;
  margin-bottom: 22px;
`;
