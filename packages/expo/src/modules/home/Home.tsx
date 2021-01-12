import React from 'react';
import {AsyncStorage} from 'react-native';
import {px2ddp, useTheme} from '@animavita/theme';
import {Background} from '@animavita/ui/layout';
import {TabBar} from '@animavita/ui/core';
import styled from 'styled-components/native';

import Button from '../../../../ui/core/Button/Button';

const Wrapper = styled.View`
  margin: 0 ${px2ddp(10)}px;
`;
const ButtonsWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`;

const Home: React.FC = () => {
  const theme = useTheme();

  const Pets = [
    {
      name: 'Thor',
      age: 2,
    },
    {
      name: 'Bob',
      age: 2,
    },
    {
      name: 'Tim',
      age: 2,
    },
  ];
  return (
    <Background>
      <Wrapper>
        {/*  <ButtonsWrapper>
          <Button title="Logout" onPress={() => AsyncStorage.clear()} />
          <Button title="Change theme" onPress={() => theme.changeTheme()} />
        </ButtonsWrapper> */}
        <TabBar
          items={[
            {displayName: 'adoções', key: 'adocoes'},
            {displayName: 'favoritos', key: 'favoritos'},
            {displayName: 'solicitações', key: 'solicitacoes'},
          ]}
          onPress={() => null}
        />
        <ButtonsWrapper>
          <Button size="small" rounded gradient text="Filtrar" onPress={() => AsyncStorage.clear()} />
          <Button size="small" rounded gradient text="Cadastrar para adoção" onPress={() => theme.changeTheme()} />
        </ButtonsWrapper>
      </Wrapper>
    </Background>
  );
};

export default Home;
