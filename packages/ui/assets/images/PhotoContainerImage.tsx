import React from 'react';
import styled from 'styled-components/native';
import {px2ddp} from '@animavita/theme';

import PhotoContainerImageBinaries from './binaries/PhotoContainerImage.jpg';

const Image = styled.Image`
  width: 100%;
  height: ${px2ddp(120)}px;
`;

const PhotoContainerImage: React.FC = () => {
  return <Image resizeMode="contain" source={PhotoContainerImageBinaries} />;
};

export default PhotoContainerImage;
