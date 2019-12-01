import styled from 'styled-components/native';
import { THEME_COLORS } from '~/utils/constants';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const Title = styled.Text`
  text-align: ${props => (props.align ? props.align : 'left')};
  font-weight: ${props => (props.weight ? props.weight : 500)};
  font-size: ${props => (props.size ? hp(`${props.size}%`) : hp('3.6%'))};
  letter-spacing: ${props => (props.spacing ? props.spacing : 0)};
  color: ${props => (props.color ? props.color : THEME_COLORS.BLACK)};
`;

export const H1 = styled.Text`
  font-weight: bold;
  font-size: ${props => (props.size ? hp(`${props.size}%`) : hp('6%'))};
  color: ${THEME_COLORS.BLACK};
`;

export const Form = styled.View`
  margin-top: ${16 * 0.7};
`;

export const Input = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;


  margin: 10px 0;
`;

export const Field = styled.Text`
  color: #c5ccd6;
  margin-bottom: 5;
  font-size: ${hp('2.3%')};
`;

export const Small = styled.Text`
  color: #2bda8e;
  font-size: 16 ;
`;

export const Wrapper = styled.View`
  flex: 1;
  font-size: 22;
`;

export const FormContainer = styled.ScrollView`
  margin-top: ${16 * 0.7};
  ${props => (props.withButton ? 'height:78%' : '')};
  margin-bottom: ${props => (props.withButton ? '5px' : 0)};
`;
