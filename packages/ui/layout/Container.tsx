import React from 'react';
import styled, {css} from 'styled-components/native';
import {FlattenInterpolation} from 'styled-components';

const Wrapper = styled.View<ContainerProps>`
  ${({direction}) =>
    css`
      flex-direction: ${direction || 'row'};
    `};
  ${({alignItems}) =>
    css`
      align-items: ${alignItems || 'center'};
    `}
  ${({justifyContent}) =>
    css`
      justify-content: ${justifyContent || 'center'};
    `}
  ${({css}) => css}
`;

interface ContainerProps {
  direction?: 'row' | 'column';
  alignItems?: 'flex-start' | 'center' | 'flex-end';
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
  css?: FlattenInterpolation<any>;
}

const Container: React.FC<ContainerProps> = ({children, ...props}) => {
  return <Wrapper {...props}>{children}</Wrapper>;
};

export default Container;
