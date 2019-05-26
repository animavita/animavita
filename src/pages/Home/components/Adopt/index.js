import React, { Fragment, useState } from 'react';
import Button from '~/components/Button';
import PropTypes from 'prop-types';
import Swiper from 'react-native-deck-swiper';
import Pet from './Pet';
import { Container, TopButtons } from './styles';
import Filter from './Filter';

const pets = [
  {
    id: 1,
    name: 'Kenji',
    breed: 'Golden Retrivier',
    distance: 9,
    image:
      'https://cdn1.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg',
  },
  {
    id: 2,
    name: 'Astolfinho',
    breed: 'SRD',
    distance: 2,
    image:
      'https://ichef.bbci.co.uk/news/660/cpsprodpb/9776/production/_105247783_e5718d3b-172c-40d4-b6d6-6e4040221049.jpg',
  },
];

const handleNextPet = () => {
  console.log('next');
};

const handleRequestAdopt = () => {
  console.log('adopt');
};

const Adopt = () => (
  <Fragment>
    <TopButtons>
      <Button title="FILTRAR" onPress={() => console.log('open')} />
      <Button title="CADASTRAR ADOÇÃO" onPress={() => console.log('open')} />
    </TopButtons>
    <Container>
      <Swiper
        cards={pets}
        cardVerticalMargin={0}
        useViewOverflow={false}
        verticalSwipe={false}
        renderCard={animal => <Pet animal={animal} />}
        onSwiped={(cardIndex) => {
          console.log(cardIndex);
        }}
        onSwipedRight={() => handleRequestAdopt()}
        onSwipedLeft={() => handleNextPet()}
        onSwipedAll={() => {
          alert('onSwipedAll');
        }}
        cardIndex={0}
        backgroundColor="#ffffff"
        stackSize={3}
      />
    </Container>
  </Fragment>
);

export default Adopt;
