import styled from "styled-components/native";
import {
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";
import theme from "../../theme";

export const AdoptionSteps = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const AdoptionStepIcon = styled.View`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const AdoptionStep = styled.Text`
  position: absolute;
  color: ${theme.colors.onPrimary};
  font-weight: 700;
`;

export const AdoptionStepsController = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${moderateScale(28)}px;
`;

export const Form = styled.View`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  gap: ${moderateScale(24)}px;
  margin: ${moderateVerticalScale(24)}px 0;
`;

export const Types = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: ${moderateScale(8)}px 0;
`;
