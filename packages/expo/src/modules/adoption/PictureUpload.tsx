import React, {useCallback} from 'react';
import styled from 'styled-components/native';
import {Background} from '@animavita/ui/layout';
import {Header, Typography, Button} from '@animavita/ui/core';
import {px2ddp, useTheme} from '@animavita/theme';
import {useI18n} from '@animavita/i18n';
import Icon from 'react-native-vector-icons/Feather';
import Images from '@animavita/ui/assets/images';

import {ImageType} from './reducers';
import {useAdoptionRegister} from './Controller';

interface PictureProps {
  image: Partial<ImageType>;
  addPicture: () => void;
  removePicture: () => void;
}

const Wrapper = styled.View`
  margin: 0 ${px2ddp(10)}px;
`;

const PicturesWrapper = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
`;

const PictureBox = styled.TouchableOpacity`
  height: ${px2ddp(30)}px;
  width: ${px2ddp(30)}px;
  border-radius: ${px2ddp(5)}px;
  margin: ${px2ddp(10)}px 0 0;
  border: 1px dashed ${({theme}) => theme.greenLight};

  align-items: center;
  justify-content: center;
`;

const RemovePictureIcon = styled(Icon).attrs({
  name: 'x',
  size: px2ddp(8),
  color: '#FF6347',
})`
  position: absolute;
  top: ${px2ddp(2)}px;
  right: ${px2ddp(2)}px;
`;

const ImagePreview = styled.Image`
  height: ${px2ddp(29)}px;
  width: ${px2ddp(29)}px;
  border-radius: ${px2ddp(4)}px;
`;

const Picture: React.FC<PictureProps> = ({image, addPicture, removePicture}) => {
  const {styledTheme} = useTheme();

  const imageExists = image && image.cancelled === false;
  const onPress = imageExists ? removePicture : addPicture;

  return (
    <PictureBox onPress={onPress}>
      {imageExists ? (
        <>
          <ImagePreview source={{uri: image.uri}} />
          <RemovePictureIcon />
        </>
      ) : (
        <Icon name="camera" size={18} color={styledTheme.greenLight} />
      )}
    </PictureBox>
  );
};

const PictureUpload: React.FC = () => {
  const {previousStep, pickImage, images, removeImage, data, submitAdoption} = useAdoptionRegister();
  const {t} = useI18n(['register_adoption']);

  const NUM_OF_PICTURES = 3;

  const renderPictures = useCallback(() => {
    return Array(NUM_OF_PICTURES)
      .fill({})
      .map((emptyItem, index) => {
        const imageData = images[index] || emptyItem;
        return (
          <Picture key={index} image={imageData} addPicture={pickImage} removePicture={() => removeImage(index)} />
        );
      });
  }, [images]);

  return (
    <Background>
      <Header title={t('picture_upload')} onPrevious={previousStep} />
      <Wrapper>
        <Images.PhotoContainerImage />

        <Typography style={{textAlign: 'center'}} variant="callout" type="bold" testID="callout">
          {t('callout', {name: data.name})}
        </Typography>

        <PicturesWrapper>{renderPictures()}</PicturesWrapper>

        <Button
          text={t('register_adoption')}
          onPress={submitAdoption}
          size="large"
          style={{marginTop: 30}}
          active
          rounded
        />
      </Wrapper>
    </Background>
  );
};

export default PictureUpload;
