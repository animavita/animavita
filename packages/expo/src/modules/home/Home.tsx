import React from 'react';
import {Button} from 'react-native';
import {px2ddp, useTheme} from '@animavita/theme';
import {Background} from '@animavita/ui/layout';
import {TabBar} from '@animavita/ui/core';
import styled from 'styled-components/native';
import {useI18n} from '@animavita/i18n';
import {useNavigation} from '@react-navigation/native';

const Wrapper = styled.View`
  margin: 0 ${px2ddp(10)}px;
`;
const ButtonsWrapper = styled.View`
  height: 100%;
  justify-content: center;
`;

const Home: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const {t} = useI18n(['home', 'tab_bar']);

  return (
    <Background>
      <Wrapper>
        <TabBar
          items={[
            {displayName: t('pages.adoptions'), key: 'adocoes'},
            {displayName: t('pages.favorites'), key: 'favoritos'},
            {displayName: t('pages.solicitations'), key: 'solicitacoes'},
          ]}
          onPress={() => null}
        />
        <ButtonsWrapper>
          <Button title={t('change_theme')} onPress={() => theme.changeTheme()} />
          <Button title={t('register_adoption')} onPress={() => navigation.navigate('Register Adoption')} />
        </ButtonsWrapper>
      </Wrapper>
    </Background>
  );
};

export default Home;
