import React from 'react';
import {useTheme} from '@animavita/theme/index';

import Typography from '../Typography';

const Form: React.FC = ({...props}) => {
  const theme = useTheme();
  return <Typography variant="body" color={theme.styledTheme.grey} {...props} />;
};

export default Form;
