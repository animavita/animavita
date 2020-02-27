import React from 'react';
import {ImageProps} from 'react-native';
import styled from 'styled-components/native';

import {px2ddp} from '@animavita/theme';

const StyledAvatar = styled.Image`
  border-radius: ${px2ddp(48) / 2}px;
  width: ${px2ddp(48)}px;
  height: ${px2ddp(48)}px;
`;

const Avatar: React.FC<ImageProps> = props => {
  return <StyledAvatar {...props} />;
};

export default Avatar;
