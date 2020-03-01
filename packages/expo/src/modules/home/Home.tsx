import React from 'react';
import {Button, AsyncStorage} from 'react-native';

import {px2ddp, useTheme} from '@animavita/theme';
import {Background} from '@animavita/ui/layout';
import {TabBar} from '@animavita/ui/core';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  margin: 0 ${px2ddp(10)}px;
`;

const Home: React.FC = () => {
  const theme = useTheme();
  return (
    <Background>
      <Wrapper>
        <TabBar
          items={[
            {displayName: 'adoções', key: 'adocoes'},
            {displayName: 'favoritos', key: 'favoritos'},
            {displayName: 'solicitações', key: 'solicitacoes'},
          ]}
          onPress={() => null}
        />
        <Button title="Logout" onPress={() => AsyncStorage.clear()} />
        <Button title="Change theme" onPress={() => theme.changeTheme()} />
      </Wrapper>
    </Background>
  );
};

export default Home;
