import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Container, Header, Tabs, TabButton, TabTitle, TabContainer,
} from './styles';
import AsyncStorage from '@react-native-community/async-storage';

import Adopt from './components/Adopt';
import Statistics from './components/Statistics';
import Profile from './components/Profile';
import Loading from '~/components/Loading';

const Home = ({navigation}) => {
  const [tab, setTab ] = useState('Adoções');
  const tabs = ['Adoções', 'Solicitações', 'Estatísticas'];

  const renderContent = () => {
      switch (tab) {
        case 'Adoções':
          return <Adopt navigation={navigation} />;
        case 'Estatísticas':
          return <Statistics />;
        default:
          return <Loading />;
      }
  }



  handleTab = (tab) => {
    setTab(tab)
  };

  renderTab = (name) => {
    const isActive = tab === name;
    return (
      <TabButton key={`tab-${name}`} active={isActive} onPress={() => this.handleTab(name)}>
        <TabTitle active={isActive}>{name}</TabTitle>
      </TabButton>
    );
  };  


  return (
    <Container>
      <Header>
        <Profile navigation={navigation}  />
      </Header>
      <TabContainer>
        <Tabs>{tabs.map(tab => renderTab(tab))}</Tabs>
      </TabContainer>
      {renderContent()}
    </Container>    
  )
}

Home.navigationOptions = {
  header: null,
};

Home.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
};

export default Home;
