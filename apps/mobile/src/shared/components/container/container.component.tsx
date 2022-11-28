import React from 'react';

import { Wrapper } from './container.styles';
import { Children } from '../../types';
import Header from '../header/header.component';

export default function Container({ children }: { children: Children }) {
  return (
    <>
      <Header />
      <Wrapper>{children}</Wrapper>
    </>
  );
}
