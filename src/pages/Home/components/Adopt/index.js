import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { showMessage } from 'react-native-flash-message';
import { isEmpty } from '~/utils/helpers';
import { gql } from 'apollo-boost';
import Button from '~/components/Button';
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import Swiper from 'react-native-deck-swiper';
import Pet from './Pet';
import Loading from '~/components/Loading';
import { Container, TopButtons } from './styles';


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
  const {
    loading, error, data, fetchMore,
  } = useQuery(GET_ADOPTS_QUERY, {
    variables: {
      filter: filters,
      skip: 0,
      first: 2,
    },
  });

  useEffect(() => {
    if (error) {
      showMessage({
        message: 'Erro na listagem de adoções!',
        description:
          'Ops! Alguns animais escaparam dos nossos abraços, tente novamente mais tarde!',
        type: 'danger',
      });
    }
  }, [error]);

  function handleRedirectToDetail(animal) {
    navigation.navigate('Details', { animal });
  }

  function nextAdoption(index) {
    if (data.adopts[index + 1]) {
      fetchMore({
        variables: {
          skip: data.adopts.length,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return Object.assign({}, prev, {
            adopts: [...prev.adopts, ...fetchMoreResult.adopts],
          });
        },
      });
    }
  }

  if(data.adopts){

    alert(JSON.stringify(data.adopts))
  }


  function renderSwiper() {
    return isEmpty(data.adopts) ? null : (
      <Swiper
        cards={data.adopts || []}
        cardVerticalMargin={0}
        useViewOverflow={false}
        verticalSwipe={false}
        onTapCard={index => handleRedirectToDetail(data.adopts[index])}
        // eslint-disable-next-line no-underscore-dangle
        renderCard={animal => <Pet key={animal._id} animal={animal} />}
        onSwiped={cardIndex => nextAdoption(cardIndex)}
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
      <Container>{loading ? <Loading /> : renderSwiper()}</Container>
    </Fragment>
  );
};

Adopt.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Adopt;
