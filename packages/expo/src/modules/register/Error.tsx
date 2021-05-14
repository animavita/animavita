import React from 'react';

import {ErrorView, TextError} from './registerFirstStep/styles';

const Error: React.FC = ({children}) => {
  return (
    <ErrorView>
      <TextError>{children}</TextError>
    </ErrorView>
  );
};

export default Error;
