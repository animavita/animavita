import React, { useState } from 'react';
import Statistics from './components/Statistics';
import PropTypes from 'prop-types';
import {
  Container, Header, Tabs, TabButton, TabTitle, TabContainer,
} from './styles';

import Adopt from './components/Adopt';
import Profile from './components/Profile';
import Loading from '~/components/Loading';

const Home = ({ navigation }) => {
  const [tab, setTab] = useState('Adoções');
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
  };

  const renderTab = (name) => {
    const isActive = tab === name;
    return (
      <TabButton key={`tab-${name}`} active={isActive} onPress={() => setTab(name)}>
        <TabTitle active={isActive}>{name}</TabTitle>
      </TabButton>
    );
  };

  return (
    <Container>
      <Header>
        <Profile navigation={navigation} />
      </Header>
      <TabContainer>
        <Tabs>{tabs.map(tabName => renderTab(tabName))}</Tabs>
      </TabContainer>
      { renderContent() }
    </Container>
  );
};

Home.navigationOptions = {
  header: null,
};

Home.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
};

export default Home;
