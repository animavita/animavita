import React, { Fragment, useState } from 'react';
import Button from '~/components/Button';
import PropTypes from 'prop-types';
import Swiper from 'react-native-deck-swiper';
import Pet from './Pet';
import { Container, TopButtons } from './styles';
import gql from 'graphql-tag';
import Loading from '~/components/Loading';
import { useQuery } from 'react-apollo-hooks';


const GET_DOGS = gql`
  {
    allAdopts{
      id,
      name,
      breed,
      images {
        url
      }
    }
  }
`;


const handleNextPet = () => {
  console.log('next');
};

const handleRequestAdopt = () => {
  console.log('adopt');
};

const Adopt = ({ navigation }) => {
  const {data,error, loading} = useQuery(GET_DOGS);

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
        { loading || data.allAdopts.length == 0 ? (
          <Loading />
        ) : (
          <Swiper
          cards={data.allAdopts}
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
        )}
      </Container>
    </Fragment>
  );
};

export default Adopt;
