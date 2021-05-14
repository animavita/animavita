import styled, {css} from 'styled-components/native';
import {px2ddp} from '@animavita/theme';
import {LinearGradient} from 'expo-linear-gradient';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface TypeProps {
  isAnimalChecked: boolean;
  onPress?: (event: Event) => void;
}

export const TypeButtons = styled(LinearGradient)<TypeProps>`
  ${props =>
    props.isAnimalChecked
      ? css`
          align-items: center;
          padding-top: 4px;
          padding-bottom: 4px;
          padding-left: 4px;
          padding-right: 4px;
          border-radius: 20px;
        `
      : css`
          align-items: center;
          padding-top: 10px;
          padding-bottom: 10px;
          padding-left: 10px;
          padding-right: 10px;
          border-radius: 20px;
        `}
`;
export const TypeButton = styled(TouchableOpacity)<TypeProps>`
  ${props =>
    props.isAnimalChecked
      ? css`
          width: 90px;
          padding-top: 5px;
          padding-bottom: 7px;
          padding-right: 5px;
          padding-left: 5px;
          border-radius: 20px;
          background-color: #fff;
        `
      : css`
          width: 80px;
        `}
`;
export const TypeText = styled.Text<TypeProps>`
  ${props =>
    props.isAnimalChecked
      ? css`
          font-size: 15px;
          color: #17d4b4;
          text-align: center;
        `
      : css`
          font-size: 15px;
          color: #fff;
          text-align: center;
        `}
`;
export const PortButtons = styled(LinearGradient)<TypeProps>`
  ${props =>
    props.isAnimalChecked
      ? css`
          align-items: center;
          padding-top: 4px;
          padding-bottom: 4px;
          padding-left: 4px;
          padding-right: 4px;
          border-radius: 20px;
        `
      : css`
          align-items: center;
          height: 40px;
          border-radius: 20px;
        `}
`;
export const PortButton = styled(TouchableOpacity)<TypeProps>`
  ${props =>
    props.isAnimalChecked
      ? css`
          width: 92px;
          background-color: #fff;
          padding-top: 5px;
          padding-bottom: 7px;
          padding-right: 5px;
          padding-left: 5px;
          border-radius: 20px;
        `
      : css`
          width: 100px;
          text-align: center;
          padding-top: 8px;
        `}
`;
export const PortText = styled.Text<TypeProps>`
  ${props =>
    props.isAnimalChecked
      ? css`
          font-size: 15px;
          color: #17d4b4;
          text-align: center;
        `
      : css`
          font-size: 15px;
          color: #fff;
          text-align: center;
        `}
`;

export const Wrapper = styled.KeyboardAvoidingView`
  margin: 0px ${px2ddp(10)}px;
`;

export const HeaderView = styled.View`
  background-color: #f9fafc;
  border-color: #dde3d0;
  padding-top: 34px;
`;

export const TitleImageView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 5px;
`;

export const ScrollViewContainer = styled.ScrollView`
  height: 420px;
  margin-bottom: 15px;
`;

export const LabelView = styled.View`
  height: 20px;
`;

export const LabelText = styled.Text`
  color: #d5d5d8;
  font-size: 16px;
`;

export const ButtonsView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const PortButtonsView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const ErrorView = styled.View`
  margin-top: -10px;
`;
export const TextError = styled.Text`
  color: #c53030;
`;
