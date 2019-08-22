import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { Title } from '~/components';
import { THEME_COLORS } from '~/utils/constants';
import { showMessage } from 'react-native-flash-message';
import { isEmpty } from '~/utils/helpers';
import { gql } from 'apollo-boost';
import Button from '~/components/Button';
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import Swiper from 'react-native-deck-swiper';
import Pet from './Pet';
import Loading from '~/components/Loading';
import {
  Container, TopButtons, ImageContainer, styles,
} from './styles';


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
  const [swipedAll, setSwipedAll] = useState(false);
  const [adopts, setAdopts] = useState([]);
  const {
    loading, error, data, fetchMore,
  } = useQuery(GET_ADOPTS_QUERY, {
    variables: {
      filter: filters,
      skip: 0,
      first: 2,
    },
    notifyOnNetworkStatusChange: true,
    onError: () => {
      showMessage({
        message: 'Erro na listagem de adoções!',
        description:
          'Ops! Alguns animais escaparam dos nossos abraços, tente novamente mais tarde!',
        type: 'danger',
      });
    },
    onCompleted: () => alert('tchau')
  });

  if (data && data.adopts) {
    setAdopts(data.adopts);
  }


  useEffect(() => {
    if (!error && !isEmpty(adopts)) {
      setSwipedAll(false);
    }
  }, [data]);


  function handleRedirectToDetail(animal) {
    navigation.navigate('Details', { animal });
  }

  function nextAdoption(index) {
    if (adopts[index + 1]) {
      fetchMore({
        variables: {
          skip: adopts.length,
          filter: filters,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;

          setAdopts([...adopts, fetchMoreResult.adopts]);
          return Object.assign({}, prev, {
            adopts: [...prev.adopts, ...fetchMoreResult.adopts],
          });
        },
      });
    }
  }

  function renderSwiper() {
    return !data || error || isEmpty(adopts) || swipedAll ? (
      <ImageContainer>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={require('~/images/emptyAdoptions.png')}
        />
        <Title size={18} align="center" color={THEME_COLORS.BLACK}>
          {error ? 'Ops! Alguma coisa deu errado' : 'Sem resultados para adoção no momento.'}
        </Title>
        <Title size={13} align="center" weight="normal" color={THEME_COLORS.GREY}>
          {!error ? 'Aah! Something went wrong' : '\nSem resultados para adoção no momento, \n acredito que eles estejam tirando uma soneca'}
        </Title>
      </ImageContainer>
    ) : (
      <Swiper
        cards={adopts}
        cardVerticalMargin={0}
        onSwipedAll={() => setSwipedAll(true)}
        useViewOverflow={false}
        verticalSwipe={false}
        onTapCard={index => handleRedirectToDetail(adopts[index])}
        // eslint-disable-next-line no-underscore-dangle
        renderCard={animal => <Pet key={animal._id} animal={animal} />}
        onSwiped={cardIndex => nextAdoption(cardIndex)}
        cardIndex={0}
        backgroundColor="#ffffff"
        stackSize={2}
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
