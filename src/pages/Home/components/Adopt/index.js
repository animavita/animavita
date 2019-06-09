import React, { Fragment, useState } from 'react';
import Button from '~/components/Button';
import PropTypes from 'prop-types';
import Swiper from 'react-native-deck-swiper';
import Pet from './Pet';
import { Container, TopButtons } from './styles';

const pets = [
  {
    id: 1,
    name: 'Kenji',
    breed: 'Golden Retrivier',
    size: 'bigger',
    distance: 1,
    sex: 'male',
    age: 9,
    image:
      'https://cdn1.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg',
  },
  {
    id: 2,
    distance: 1,
    name: 'Astolfinho',
    size: 'bigger',
    breed: 'SRD',
    sex: 'male',
    age: 9,
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

const Adopt = ({ navigation }) => {
  function handleRedirectToDetail(index) {
    navigation.navigate('Details', { animal: pets[index] });
  }
  return (
    <Fragment>
      <TopButtons>
        <Button title="FILTRAR" active onPress={() => navigation.navigate('Filter')} />
        <Button title="CADASTRAR ADOÇÃO" active onPress={() => navigation.navigate('Adoption')} />
      </TopButtons>
      <Container>
        <Swiper
          cards={pets}
          cardVerticalMargin={0}
          useViewOverflow={false}
          verticalSwipe={false}
          onTapCard={index => handleRedirectToDetail(index)}
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
};

export default Adopt;
