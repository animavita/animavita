import React from 'react';
import {AsyncStorage} from 'react-native';
import {px2ddp, useTheme} from '@animavita/theme';
import {Background} from '@animavita/ui/layout';
import {TabBar} from '@animavita/ui/core';
import styled from 'styled-components/native';
import {useI18n} from '@animavita/i18n';

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
  const {t} = useI18n(['home', 'tab_bar']);

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
            {displayName: t('pages.adoptions'), key: 'adocoes'},
            {displayName: t('pages.favorites'), key: 'favoritos'},
            {displayName: t('pages.solicitations'), key: 'solicitacoes'},
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
