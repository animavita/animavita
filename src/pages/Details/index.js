import React from 'react';
import { View } from 'react-native';
import GradientButton from '~/components/GradientButton';
import { Title, H1 } from '~/components';
import Swiper from 'react-native-swiper';
import { THEME_COLORS } from '~/utils/constants';
import { Icon } from 'react-native-elements';
import {
  TopContent,
  FooterContent,
  PetData,
  PetDetail,
  BackButton,
  Container,
  PetImage,
  Slide,
  styles,
} from './styles';

const Details = ({ navigation }) => {
  const { animal } = navigation.state.params;
  return (
    <Container>
      <Slide>
        <Swiper
          style={styles.wrapper}
          dotStyle={styles.dot}
          activeDotStyle={styles.dot}
          activeDotColor={THEME_COLORS.SECONDARY}
          dotColor="white"
        >
          <PetImage
            source={{
              uri: animal.firstImage,
            }}
          />
          <PetImage
            source={{
              uri: animal.image,
            }}
          />
        </Swiper>
      </Slide>
      <BackButton onPress={() => navigation.goBack()}>
        <Icon name="ios-arrow-round-back" type="ionicon" color={THEME_COLORS.BLACK} size={40} />
      </BackButton>
      <PetDetail>
        <FooterContent>
          <TopContent>
            <H1 size={35}>{animal.name}</H1>
            <Icon
              raised
              name="heart"
              type="font-awesome"
              color="#FF6767"
              containerStyle={styles.heart}
              onPress={() => console.log('hello')}
            />
          </TopContent>

          <PetData>
            <Title weight="bold" color={THEME_COLORS.BLACK} size={13}>
              {'Raça \n'}
              <Title weight="normal" color="#c5ccd6" size={11}>
                Golden Retrivier
              </Title>
            </Title>
            <Title weight="bold" color={THEME_COLORS.BLACK} size={13}>
              {'Tamanho \n'}
              <Title weight="normal" color="#c5ccd6" size={11}>
                Pequeno
              </Title>
            </Title>
            <Title weight="bold" color={THEME_COLORS.BLACK} size={13}>
              {'Idade \n'}
              <Title weight="normal" color="#c5ccd6" size={11}>
                1 ano
              </Title>
            </Title>
          </PetData>
          <Title weight="normal" color="#c5ccd6" numberOfLines={4} size={11}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt sint maxime quod totam
            sequi alias, dolores eum quasi voluptate distinctio dolorum repellat commodi totam sequi
            alias, dolores eum quasi voluptate distinctio dolorum repellat commodi molestias quos
            earum. Fugiat consectetur laborum doloribus?
          </Title>
        </FooterContent>
        <GradientButton disabled={false} onPress={() => setFinishStep(false)}>
          <Title size={14} color="white">
            Solicitar Adoção
          </Title>
        </GradientButton>
      </PetDetail>
    </Container>
  );
};

export default Details;
