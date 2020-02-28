import React from 'react';
import styled from 'styled-components/native';

import TabBar from '../core/TabBar';

const Wrapper = styled.View`
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 50%;
  margin: 0 auto;
`;
const SpaceLimiter = styled.View`
  max-width: 50%;
`;

export default {
  title: 'TabBar',
  component: TabBar,
};

export const items = () => (
  <Wrapper>
    <TabBar
      items={[
        {displayName: 'adoções', key: 'adocoes'},
        {displayName: 'favoritos', key: 'favoritos'},
        {displayName: 'solicitações', key: 'solicitacoes'},
      ]}
    />
  </Wrapper>
);
