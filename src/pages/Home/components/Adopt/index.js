import React, { Fragment } from 'react';
import Button from '~/components/Button';
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import Swiper from 'react-native-deck-swiper';
import Pet from './Pet';
import { Container, TopButtons } from './styles';
import gql from 'graphql-tag';
import Loading from '~/components/Loading';

const GET_ADOPTS_QUERY = gql`
  query getAllAdopts($filter: AdoptsFilter, $skip: Int, $first: Int) {
    adopts(filter: $filter, skip: $skip, first: $first) {
      _id
      name
      breed
      type
      firstImage
    }
  }
`;

const Adopt = ({ navigation }) => {
  const filters = useSelector(state => state.filter);
  let adoptsData = [];
  const { loading, error, data } = useQuery(GET_ADOPTS_QUERY, {
    variables: {
      filter: filters,
      skip: 0,
      first: 10,
    },
  });

  if (!loading) {
    console.log(data);
    console.log(loading);
    console.log(error);
    adoptsData = data.adopts;
  }

  function handleRedirectToDetail(animal) {
    navigation.navigate('Details', { animal });
  }

  function nextAnimal(index) {
    // if(data.allAdopts[index + 1]){
    //   alert('exist')
    //   fetchMore({
    //     variables: {
    //       quantity: 2
    //     },
    //     updateQuery: (previousResult, { fetchMoreResult }) => {
    //       if (!fetchMoreResult) {
    //         return previousResult;
    //       }
    //       alert(JSON.stringify(fetchMoreResult))
    //       alert(JSON.stringify(previousResult))
    //       return {
    //         ...fetchMoreResult,
    //       };
    //     },
    //   });
    // }
  }

  function renderSwiper() {
    if (loading) {
      return <Loading />;
    }
    if (adoptsData.length === 0) {
      return null;
    }

    return (
      <Swiper
        cards={adoptsData}
        cardVerticalMargin={0}
        useViewOverflow={false}
        verticalSwipe={false}
        onTapCard={index => handleRedirectToDetail(data.allAdopts[index])}
        // eslint-disable-next-line no-underscore-dangle
        renderCard={animal => <Pet key={animal._id} animal={animal} />}
        onSwiped={cardIndex => nextAnimal(cardIndex)}
        cardIndex={0}
        backgroundColor="#ffffff"
        stackSize={3}
      />
    );
  }

  return (
    <Fragment>
      <TopButtons>
        <Button title="FILTRAR" active onPress={() => navigation.navigate('Filter')} />
        <Button title="CADASTRAR ADOÇÃO" active onPress={() => navigation.navigate('Adoption')} />
      </TopButtons>
      <Container>{renderSwiper()}</Container>
    </Fragment>
  );
};

export default Adopt;
