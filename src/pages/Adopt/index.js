import React, { useState } from 'react';
import Swiper from 'react-native-deck-swiper';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Filter from './components/Filter';
import Header from './components/Header';
import Pet from '~/pages/Home/components/Adopt/Pet';

import { Container } from './styles';

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

const handleRequestAdopt = () => {
  console.log('Adopt Solicitation');
};

const handleNextPet = () => {
  console.log('Adopt Solicitation');
};

const Adopt = (props) => {
  const [openModal, setModalOpen] = useState(false);
  return (
    <Container>
      <Filter
        visible={openModal}
        closeModal={() => setModalOpen(false)}
        openModal={() => setModalOpen(true)}
      />
      <Swiper
        cards={pets}
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
        backgroundColor="#e5e5e5"
        stackSize={3}
      >
        <Header
          openModal={() => setModalOpen(true)}
          createAdopt={() => props.navigation.navigate('NewAdopt')}
        />
      </Swiper>
    </Container>
  );
};

Adopt.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default Adopt;
