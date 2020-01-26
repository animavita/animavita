import React from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  flex-grow: 1;
`;

/**
 * REMINDER: this component only works on mobile
 */
const FillSpace: React.FC = () => {
  return <Wrapper />;
};

export default FillSpace;
