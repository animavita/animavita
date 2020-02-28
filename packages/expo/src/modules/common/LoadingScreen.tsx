import React from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  justify-content: center;
  align-items: center;
  height: 100%;
`;
const Loading = styled.ActivityIndicator``;

const LoadingScreen: React.FC = () => {
  return (
    <Wrapper>
      <Loading />
    </Wrapper>
  );
};

export default LoadingScreen;
