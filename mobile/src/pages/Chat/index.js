import React, { useState } from 'react';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useQuery, useSubscription } from '@apollo/react-hooks';
import { Text, StyleSheet, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import Message from './components/Message';
import { H1 } from '~/components';
import Loading from '~/components/Loading';
import { THEME_COLORS } from '~/utils/constants';

import { Container, Header, Profile, Content } from './styles';

const user = {
  name: 'Ada Lovelace',
  avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
};

const GET_CONVERSATION_MESSAGES_QUERY = gql`
  query getConversationMessages($id: ID!) {
    Conversation(id: $id) {
      id
      messages {
        id
        from
        message
      }
    }
  }
`;

const NEW_MESSAGES_SUBSCRIPTION = gql`
  subscription onMessagesReceived {
    Message(
      filter: { mutation_in: CREATED, node: { from_not: "Wendel Freitas" } }
    ) {
      node {
        from
        message
      }
    }
  }
`;

const Chat = () => {
  const [messages, useMessages] = useState([
    {
      _id: 1,
      text: 'Hello developer',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Ada Lovelace',
        avatar:
          'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
      }
    }
  ]);

  const { data, error, loading } = useQuery(GET_CONVERSATION_MESSAGES_QUERY, {
    variables: {
      id: 'cjxjllghd96ec0162kjwb0ft0'
    }
  });

  function onSend(typedMessage) {
    useMessages(GiftedChat.append(messages, typedMessage));
  }
  const {
    data: subData,
    error: subError,
    loading: subloading
  } = useSubscription(NEW_MESSAGES_SUBSCRIPTION);

  return (
    <Container>
      <Header>
        <H1>{user.name}</H1>
        <Profile>
          <Avatar
            rounded
            size={16 * 2.2}
            source={{
              uri: user.avatar,
            }}
          />
        </Profile>
      </Header>
      {loading ? (
        <Loading />
      ) : (
        <Content>
          <GiftedChat
            inverted
            scrollToBottom
            renderBubble={props => <Message {...props} />}
            messages={messages}
            locale="ptbr"
            alwaysShowSend
            listViewProps={{ showsVerticalScrollIndicator: false }}
            placeholder=""
            onSend={typedMessage => onSend(typedMessage)}
            user={{
              _id: 1,
              name: 'Wendel Freitas',
            }}
            renderSend={props => (
              <Send {...props}>
                <View>
                  <Text style={styles.button}>Enviar</Text>
                </View>
              </Send>
            )}
          />
        </Content>
      )}
    </Container>
  );
};

Chat.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
  }),
};

Chat.defaultProps = {
  user: {
    name: '',
    avatar: ''
  }
};

const styles = StyleSheet.create({
  button: {
    marginLeft: 10,
    color: THEME_COLORS.SECONDARY,
    fontWeight: 'bold',
  },
});

export default Chat;
