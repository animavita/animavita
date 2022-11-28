import styled from "styled-components/native";
import theme from "../../../theme";
import { moderateScale } from "react-native-size-matters";

export const Wrapper = styled.View`
  padding-left: ${moderateScale(16)}px;
  padding-right: ${moderateScale(16)}px;
  padding-bottom: ${moderateScale(16)}px;
  background-color: ${theme.colors.background};
`;
