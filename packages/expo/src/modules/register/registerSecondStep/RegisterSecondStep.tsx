import React, {useState} from 'react';
import {StyleSheet, ActivityIndicator, Alert} from 'react-native';
import {Feather, MaterialIcons} from '@expo/vector-icons';
import {Background} from '@animavita/ui/layout';
import {useNavigation} from '@react-navigation/native';
import {Typography} from '@animavita/ui/core';
import Button from '@animavita/ui/core/Button/Button';
import * as ImagePicker from 'expo-image-picker';

import Header from '../Header';
import dogImage from '../../../../assets/dog.png';

import {Wrapper, ImageContainer, Image, UploadedImagesContainer, CameraButton, UploadedImage} from './styles';

type ImageInfo = {
  uri?: string | any;
  width: number;
  height: number;
  type?: 'image' | 'video';
  exif?: {
    [key: string]: any;
  };
  base64?: string;
};

const LARGE = 'large';
const HEADLINE = 'headline';

const RegisterSecondStep: React.FC = () => {
  const [images, setImages] = useState<any[]>(Array.from({length: 3}));
  const [imagesSelected, setSelectedImages] = useState<any[]>([]);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSelectImages(indexSelected) {
    const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert('We need access to your pictures.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (result.cancelled) {
      return;
    }

    const {uri} = result as ImageInfo;

    images.splice(indexSelected, 1, uri);
    imagesSelected.splice(indexSelected, 1, uri);

    setImages([...images]);
    setSelectedImages([...imagesSelected]);
  }

  function removeSelectedImage(indexSelected) {
    images.splice(indexSelected, 1, null);
    imagesSelected.splice(indexSelected, 1, null);
    setImages([...images]);
    setSelectedImages([...imagesSelected]);
  }

  function backToHomePage() {
    if (imagesSelected.length === 0) {
      Alert.alert('Please select at least one image');
    } else {
      setIsLoading(true);
      setTimeout(() => {
        navigation.navigate('Home');
        setIsLoading(false);
      }, 3000);
    }
  }

  return (
    <Background>
      <Wrapper>
        <Header />
        <Image source={dogImage} />
        <Typography variant={HEADLINE} style={styles.labelText}>
          Que tal umas fotos fofissimas no Zeus?
        </Typography>
        <UploadedImagesContainer>
          {images.map((image, index) => {
            if (image) {
              return (
                <ImageContainer key={index}>
                  <MaterialIcons
                    name="cancel"
                    size={24}
                    color="red"
                    style={{left: 90, marginBottom: -10, zIndex: 1}}
                    onPress={() => {
                      removeSelectedImage(index);
                    }}
                  />
                  <UploadedImage key={index} source={{uri: image}} />
                </ImageContainer>
              );
            }
            return (
              <CameraButton
                key={index}
                onPress={() => {
                  handleSelectImages(index);
                }}>
                <Feather name="camera" size={24} color="#17D4B4" />
              </CameraButton>
            );
          })}
        </UploadedImagesContainer>
        <Button
          onPress={() => {
            backToHomePage();
          }}
          text={!isLoading && 'Cadastrar Adoção'}
          size={LARGE}
          gradient={true}
          rounded={true}>
          {isLoading && <ActivityIndicator size="large" color="#ffffff" />}
        </Button>
        <Typography
          onPress={() => {
            navigation.goBack();
          }}
          variant={HEADLINE}
          style={styles.detailLabel}>
          Voltar para detalhes
        </Typography>
      </Wrapper>
    </Background>
  );
};

const styles = StyleSheet.create({
  labelText: {
    alignSelf: 'center',
  },
  detailLabel: {
    marginTop: 10,
    alignSelf: 'center',
    color: '#d9dad7',
  },
});

export default RegisterSecondStep;
