import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '~/components/ListItem';
import { Container, Content } from './styles';

import Profile from '~/components/Profile';

const Messages = ({ navigation }) => (
  <Container>
    <Profile title="Mensagens" />
    <Content>
      <ListItem
        title="Ada Lovelace"
        subtitle="Hello developer!"
        onPress={() => navigation.navigate('Chat')}
        avatar="https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
      />
    </Content>
  </Container>
);

Messages.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Messages;
