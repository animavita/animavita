import React from 'react';
import {Image} from 'react-native';
import styled from 'styled-components/native';
import {Background} from '@animavita/ui/layout';
import {Header, Typography, Button} from '@animavita/ui/core';
import {px2ddp} from '@animavita/theme';
import * as ImagePicker from 'expo-image-picker';
import {useI18n} from '@animavita/i18n';

import {useAdoptionRegister} from './Controller';

interface IPictureProps {
  image: Partial<ImagePicker.ImagePickerResult>;
}

const Wrapper = styled.View`
  margin: 0 ${px2ddp(10)}px;
`;

const Picture: React.FC<IPictureProps> = ({image}) => {
  return null;
};

const PictureUpload: React.FC = () => {
  const {previousStep, pickImage} = useAdoptionRegister();
  const {t} = useI18n(['register_adoption']);

  return (
    <Background>
      <Header title={t('picture_upload')} onPrevious={previousStep} />
      <Wrapper>
        <Typography variant="body" type="bold" testID="title">
          Que tal umas fotos fofíssimas do Zeus?
        </Typography>

        <Button text={t('add_picture')} onPress={pickImage} size="large" style={{marginTop: 30}} active rounded />
      </Wrapper>
    </Background>
  );
};

export default PictureUpload;
