import React, { useState, useEffect } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';


import Adopt from './components/Adopt';
import Solicitations from './components/Solicitations';
import Favorites from './components/Favorites';
import Profile from './components/Profile';
import Loading from '~/components/Loading';
import useOneSignal from '~/hooks/useOneSignal';
import {
  Container, Header, Tabs, TabButton, TabTitle, TabContainer,
} from './styles';


const Home = ({ navigation }) => {
  const [tab, setTab] = useState('Adoções');
  const auth = useSelector(state => state.auth);
  const tabs = ['Adoções', 'Solicitações', 'Favoritos'];
  useOneSignal();

  useEffect(() => {
    if (!auth.address) {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Localization' })],
      });
      navigation.dispatch(resetAction);
    }
  }, [auth.address, navigation]);
  
  const renderContent = () => {
    switch (tab) {
      case 'Adoções':
        return <Adopt navigation={navigation} />;
      case 'Solicitações':
        return <Solicitations />;
      case 'Favoritos':
        return <Favorites />;
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
      {renderContent()}
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
