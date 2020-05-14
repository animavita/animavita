import React from 'react';
import styled from 'styled-components/native';
import {useTheme} from '@animavita/theme/index';

import Typography, {TypographyProps} from '../Typography';

// styles
export const Container = styled.View``;

const Form: React.FC<TypographyProps> = ({...props}) => {
  const theme = useTheme();
  return <Typography variant="body" color={theme.styledTheme.grey} {...props} />;
};

export default Form;
