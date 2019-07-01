import React, { Fragment } from 'react';
import Button from '~/components/Button';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-apollo-hooks';
import Swiper from 'react-native-deck-swiper';
import Pet from './Pet';
import { Container, TopButtons } from './styles';
import gql from 'graphql-tag';
import Loading from '~/components/Loading';

const GET_DOGS_QUERY = gql`
  query getAllAdopts($quantity: Int) {
    allAdopts(first: $quantity) {
      id
      name
      breed
      type
      images {
        url
      }
    }
  }
`;

const Adopt = ({ navigation }) => {
  const filters = useSelector(state => state.filter.data);
  const { data, error, loading } = useQuery(GET_DOGS_QUERY, {
    variables: {
      quantity: filters.quantity,
    },
  });

  function handleRedirectToDetail(animal) {
    navigation.navigate('Details', { animal });
  }

  return (
    <Fragment>
      <TopButtons>
        <Button title="FILTRAR" active onPress={() => navigation.navigate('Filter')} />
        <Button title="CADASTRAR ADOÇÃO" active onPress={() => navigation.navigate('Adoption')} />
      </TopButtons>
      <Container>
        {loading ? (
          <Loading />
        ) : (
          <Swiper
            cards={data.allAdopts}
            cardVerticalMargin={0}
            useViewOverflow={false}
            verticalSwipe={false}
            onTapCard={index => handleRedirectToDetail(data.allAdopts[index])}
            renderCard={animal => (data.allAdopts.length > 0 ? <Pet animal={animal} /> : null)}
            onSwiped={cardIndex => console.log(cardIndex)}
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
