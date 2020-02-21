import React from 'react';
import styled from 'styled-components/native';
import {Button, AsyncStorage} from 'react-native';

const Wrapper = styled.SafeAreaView``;

const Home: React.FC = () => {
  return (
    <Wrapper>
      <Button title="Logout" onPress={() => AsyncStorage.clear()} />
    </Wrapper>
  );
};

export default Home;
