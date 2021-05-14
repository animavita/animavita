import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AntDesign} from '@expo/vector-icons';
import {Typography} from '@animavita/ui/core';

import {HeaderView, TitleImageView} from './registerFirstStep/styles';

const TITLE_2 = 'title-2';

const Header: React.FC = () => {
  const navigation = useNavigation();

  return (
    <HeaderView>
      <TouchableOpacity onPress={navigation.goBack}>
        <AntDesign name="arrowleft" size={24} color="#D4D5D4" />
      </TouchableOpacity>
      <TitleImageView>
        <Typography variant={TITLE_2} type={'bold'}>
          Cadastrar Adoção
        </Typography>
      </TitleImageView>
    </HeaderView>
  );
};

export default Header;
