import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container, Header, Tabs, TabButton, TabTitle, TabContainer,
} from './styles';

import Adopt from './components/Adopt';
import Statistics from './components/Statistics';
import Profile from './components/Profile';
import Loading from '~/components/Loading';

class Home extends Component {
  state = {
    active: 'Adoções',
  };

  handleTab = (tab) => {
    this.setState({ active: tab });
  };

  renderTab = (name) => {
    const { active } = this.state;
    const isActive = active === name;
    return (
      <TabButton key={`tab-${name}`} active={isActive} onPress={() => this.handleTab(name)}>
        <TabTitle active={isActive}>{name}</TabTitle>
      </TabButton>
    );
  };

  renderContent = (navigation) => {
    const { active } = this.state;
    switch (active) {
      case 'Adoções':
        return <Adopt navigation={navigation} />;
      case 'Estatísticas':
        return <Statistics />;
      default:
        return <Loading />;
    }
  };

  render() {
    const tabs = ['Adoções', 'Solicitações', 'Estatísticas'];
    const user = {
      name: 'Wendel',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    };
    const { navigation } = this.props;
    return (
      <Container>
        <Header>
          <Profile navigation={navigation} user={user} />
        </Header>
        <TabContainer>
          <Tabs>{tabs.map(tab => this.renderTab(tab))}</Tabs>
        </TabContainer>
        {this.renderContent(navigation)}
      </Container>
    );
  }
}

Home.navigationOptions = {
  header: null,
};

Home.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
};

export default Home;
