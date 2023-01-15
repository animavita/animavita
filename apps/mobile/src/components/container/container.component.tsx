import React from 'react';

import { Wrapper } from './container.styles';
import { Children } from '../../shared/types';
import Header from '../header/header.component';

export default function Container({ children }: { children: Children }) {
  return (
    <>
      <Header />
      <Wrapper>{children}</Wrapper>
    </>
  );
}
