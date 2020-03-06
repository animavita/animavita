import React from 'react';
import styled from 'styled-components/native';
import {px2ddp} from '@animavita/theme';

const Wrapper = styled.View`
  height: ${px2ddp(2)}px;
  width: 100%;
  background-color: ${({theme}) => theme.greenLight};
`;

interface LoadingBottomBarProps {
  show: boolean;
}

const LoadingBottomBar: React.FC<LoadingBottomBarProps> = ({show}) => {
  return show ? <Wrapper /> : null;
};

export default LoadingBottomBar;
