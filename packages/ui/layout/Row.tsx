import React from 'react';
import styled, {css} from 'styled-components/native';

const Wrapper = styled.View<RowProps>`
  flex-direction: row;
  ${({alignItems}) =>
    css`
      align-items: ${alignItems || 'center'};
    `}
  ${({justifyContent}) =>
    css`
      justify-content: ${justifyContent || 'center'};
    `}
`;

interface RowProps {
  alignItems?: 'flex-start' | 'center' | 'flex-end';
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
}

const Row: React.FC<RowProps> = ({children, ...props}) => {
  return <Wrapper {...props}>{children}</Wrapper>;
};

export default Row;
