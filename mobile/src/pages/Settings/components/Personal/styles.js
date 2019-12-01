import styled from 'styled-components/native';
import { TextInput as DefaultInput } from 'react-native';
import { THEME_COLORS } from '~/utils/constants';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';


export const TextInput = styled(DefaultInput)`
  font-size: ${hp('2%')};
  padding: 0;
  color: ${THEME_COLORS.BLACK};
`;

export const EditButton = styled.TouchableOpacity``;
