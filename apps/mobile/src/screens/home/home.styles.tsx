import styled from "styled-components/native";
import theme from "../../theme";
import { moderateScale } from "react-native-size-matters";

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.white};
  align-items: center;
  justify-content: center;
`;

export const Adoption = styled.View`
  margin-top: ${moderateScale(10)}px;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;
