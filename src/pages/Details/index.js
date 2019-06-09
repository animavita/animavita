import React from 'react';
import {
  Text, View, TouchableOpacity, ScrollView,
} from 'react-native';

import GradientButton from '~/components/GradientButton';
import { Title, H1 } from '~/components';
import Swiper from 'react-native-swiper';
import { THEME_COLORS } from '~/utils/constants';
import { Icon } from 'react-native-elements';
import {
  ScrollScreen,
  Action,
  ActionButtons,
  Observations,
  FooterContent,
  PetData,
  PetDetail,
  BackButton,
  Container,
  PetImage,
  Slide,
  styles,
} from './styles';

const Details = ({ navigation, animal }) => (
  <Container>
    <Slide>
      <Swiper style={styles.wrapper} activeDotColor={THEME_COLORS.SECONDARY} dotColor="white">
        <PetImage
          source={{
            uri: navigation.state.params.animal.image,
          }}
        />
        <PetImage
          source={{
            uri: navigation.state.params.animal.image,
          }}
        />
      </Swiper>
    </Slide>
    <BackButton onPress={() => navigation.goBack()}>
      <Icon name="ios-arrow-round-back" type="ionicon" color={THEME_COLORS.BLACK} size={40} />
    </BackButton>
    <PetDetail>
      <ScrollScreen showsVerticalScrollIndicator={false}>
        <FooterContent>
          <H1 size={35}>{navigation.state.params.animal.name}</H1>

          <PetData>
            <Title weight="normal" color="#c5ccd6" size={12}>
              Pequeno
            </Title>
            <Title weight="normal" color="#c5ccd6" size={12}>
              2 anos
            </Title>
            <Title weight="normal" color="#c5ccd6" size={12}>
              Macho
            </Title>
          </PetData>

          <ActionButtons>
            <Action>
              <Icon name="mail" type="feather" color={THEME_COLORS.BLACK} size={25} />
              <Title weight="normal" size={10}>
                MENSAGEM
              </Title>
            </Action>
            <Action>
              <Icon name="heart" type="feather" color={THEME_COLORS.BLACK} size={25} />

              <Title weight="normal" size={10}>
                FAVORITAR
              </Title>
            </Action>
            <Action>
              <Icon name="share" type="feather" color={THEME_COLORS.BLACK} size={25} />

              <Title weight="normal" size={10}>
                COMPARTILHAR
              </Title>
            </Action>
          </ActionButtons>
          <Observations>
            <Title weight="normal" color="#c5ccd6" size={12}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt sint maxime quod
              totam sequi alias, dolores eum quasi voluptate distinctio dolorum repellat commodi
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt sint maxime quod
              totam sequi alias, dolores eum quasi voluptate distinctio dolorum repellat commodi
              molestias quos earum. Fugiat consectetur laborum doloribus?
            </Title>
          </Observations>
        </FooterContent>
      </ScrollScreen>
      <GradientButton onPress={() => setFinishStep(false)}>
        <Title size={14} color="white">
          Solicitar Adoção
        </Title>
      </GradientButton>
    </PetDetail>
  </Container>
);

export default Details;
