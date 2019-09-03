import styled from 'styled-components/native';
import { TextInput as DefaultInput } from 'react-native';
import { THEME_COLORS } from '~/utils/constants';

export const TextInput = styled(DefaultInput)`
  padding: 0;
  color: ${THEME_COLORS.BLACK};
`;
