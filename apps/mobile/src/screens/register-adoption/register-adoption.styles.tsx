import { moderateScale } from "react-native-size-matters";
import styled from "styled-components/native";

export const Title = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${moderateScale(28)}px;
`;
