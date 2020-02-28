import React from 'react';
import {ImageProps} from 'react-native';
import styled from 'styled-components/native';

import {px2ddp} from '@animavita/theme';

const StyledAvatar = styled.Image<Pick<AvatarProps, 'width' | 'height'>>`
  border-radius: ${px2ddp(48) / 2}px;
  width: ${({width}) => width || px2ddp(48)}px;
  height: ${({height}) => height || px2ddp(48)}px;
`;

interface AvatarProps {
  width?: number;
  height?: number;
}

const Avatar: React.FC<ImageProps & AvatarProps> = props => {
  return <StyledAvatar {...props} />;
};

export default Avatar;
