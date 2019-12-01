import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { showMessage } from 'react-native-flash-message';
import { isEmpty } from '~/utils/helpers';
import { gql } from 'apollo-boost';
import Button from '~/components/Button';
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import Swiper from 'react-native-deck-swiper';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Pet from './Pet';
import Loading from '~/components/Loading';
import ErrorContainer from '~/components/ErrorContainer';
import { Container, TopButtons } from './styles';


const GET_ADOPTS_QUERY = gql`
  query getAllAdopts($filter: AdoptsFilter, $skip: Int, $first: Int) {
    adopts(filter: $filter, skip: $skip, first: $first) {
      _id
      name
      breed
      type
      age
      size
      gender
      firstImage
    }
  }
`;

const Adopt = ({ navigation }) => {
  const filters = useSelector(state => state.filter);
  const [swipedAll, setSwipedAll] = useState(false);
  const [adopts, setAdopts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { error, data, fetchMore } = useQuery(GET_ADOPTS_QUERY, {
    variables: {
      filter: filters,
      skip: 0,
      first: 5,
    },
    onCompleted: (newData) => {
      setAdopts(newData.adopts);
      setLoading(false);
    },
    fetchPolicy: 'no-cache',
    onError: () => {
      showMessage({
        message: 'Erro na listagem de adoções!',
        description:
          'Ops! Alguns animais escaparam dos nossos abraços, tente novamente mais tarde!',
        type: 'danger',
      });
      setLoading(false);
    },
  });

  useEffect(() => {
    if (data && data.adopts && !isEmpty(data.adopts)) {
      setSwipedAll(false);
    }
  }, [data]);

  useEffect(() => {
    setLoading(true);
  }, [filters]);

  function handleRedirectToDetail(animal) {
    navigation.navigate('Details', { animal });
  }

  function fetchMoreAdoptions(currentIndex) {
    const checkNextCards = adopts[currentIndex + 2];
    if (!checkNextCards) {
      fetchMore({
        variables: {
          skip: data.adopts.length,
          filter: filters,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return setAdopts([...prev.adopts, ...fetchMoreResult.adopts]);
        },
      });
    }
  }

  function renderSwiper() {
    if (error || !data) {
      return (
        <ErrorContainer
          image={require('~/images/emptyAdoptions.png')}
          title="Ops! Alguma coisa deu errado"
          description={
            '\n Desculpe, algum erro de requisição aconteceu. \n Alguns gatinhos puxaram os cabos de rede do servidor'
          }
        />
      );
    }

    if (isEmpty(adopts) || swipedAll) {
      const description = isEmpty(adopts)
        ? '\nNão existem adoções cadastradas, \n acredito que eles estejam tirando uma soneca.'
        : '\nSem resultados para adoção no momento, \n como você não gostou dessas fofuras que apareceram?';
      return (
        <ErrorContainer
          image={require('~/images/emptyAdoptions.png')}
          title="Droga! Não sei o que fazer, talvez uns biscoitinhos?!"
          description={description}
        />
      );
    }

    return (
      <Swiper
        cards={adopts}
        cardVerticalMargin={0}
        cardHorizontalMargin={hp('2%')}
        onSwipedAll={() => setSwipedAll(true)}
        useViewOverflow={false}
        verticalSwipe={false}
        onTapCard={cardIndex => handleRedirectToDetail(adopts[cardIndex])}
        renderCard={animal => <Pet key={animal._id} animal={animal} />}
        onSwiped={cardIndex => fetchMoreAdoptions(cardIndex)}
        cardIndex={0}
        backgroundColor="#ffffff"
        stackSize={2}
      />
    );
  }

  return (
    <Fragment>
      <TopButtons>
        <Button
          title="FILTRAR"
          active
          onPress={() => navigation.navigate('Filter')}
        />
        <Button
          title="CADASTRAR ADOÇÃO"
          active
          onPress={() => navigation.navigate('Adoption')}
        />
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
