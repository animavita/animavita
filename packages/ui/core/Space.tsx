import React from 'react';
import styled, {css} from 'styled-components/native';

const SpaceComponent = styled.View<SpaceProps>`
  ${({width}) =>
    width &&
    css`
      width: ${width}px;
    `}
  ${({height}) =>
    height &&
    css`
      height: ${height}px;
    `}
`;

interface SpaceProps {
  height?: number;
  width?: number;
}

const Space: React.FC<SpaceProps> = props => <SpaceComponent {...props} />;

export default Space;
