import React, { useState } from 'react';
import { GiftedChat, Send, InputToolbar } from 'react-native-gifted-chat';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import { Avatar } from 'react-native-elements';
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Message from './components/Message';
import { H1 } from '~/components';
import Loading from '~/components/Loading';

import {
  Container, Header, Profile, Content, styles,
} from './styles';

const GET_CONVERSATIONS_QUERY = gql`
  query getAllMessagesFromConversation($conversation: String!, $skip: Int, $first: Int) {
    messages(conversationId: $conversation, skip: $skip, first: $first) {
      _id
      text
      createdAt
      user {
        _id
        name
        avatar
      }
    }
  }
`;

export const USER_SEND_MESSAGE_MUTATION = gql`
  mutation SendMessageMutation($conversation: String, $user: String!, $content: String!) {
    SendMessageMutation(
      input: { conversationId: $conversation, userId: $user, content: $content }
    ) {
      message {
        conversation {
          _id
        }        
        user {
          _id
          name
          avatar
        }
        text
      }
    }
  }
`;

const MESSAGE_SUBSCRIPTION = gql`
  subscription onMessageReceived($conversation: String!) {
    MessageSended(conversationId: $conversation) {
      _id
      text
      user {
        _id
        name
        avatar
      }
      createdAt
    }
  }
`;

const Chat = ({ navigation }) => {
  const { conversation, user } = navigation.state.params;
  const auth = useSelector(state => state.auth);

  const [messages, setMessages] = useState([]);

  useSubscription(MESSAGE_SUBSCRIPTION, {
    variables: {
      conversation: conversation._id,
    },
    onSubscriptionData: ({ subscriptionData }) => {
      setMessages(GiftedChat.append(messages, subscriptionData.data.MessageSended));
    },
  });

  useQuery(GET_CONVERSATIONS_QUERY, {
    variables: {
      conversation: conversation._id,
      skip: 0,
      first: 50,
    },
    fetchPolicy: 'no-cache',
    onCompleted: (response) => {
      setMessages(response.messages);
    },
    onError: () => {
      showMessage({
        message: 'Erro ao carregar mensagens!',
        description: 'Ops! Algum erro aconteceu, tente novamente mais tarde!',
        type: 'danger',
      });
    },
  });

  function throwMessageError() {
    showMessage({
      message: 'Erro ao enviar a mensagem!',
      description: 'Ops! Algum erro ao enviar a mensagem aconteceu, tente novamente mais tarde.',
      type: 'danger',
    });
  }

  const [sendMessage] = useMutation(USER_SEND_MESSAGE_MUTATION, {
    onError: () => throwMessageError(),
  });

  function onSend(typedMessage) {
    setMessages(GiftedChat.append(messages, typedMessage));
    sendMessage({
      variables: {
        conversation: conversation._id,
        user: user._id,
        content: typedMessage[0].text,
      },
    });
  }

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
      <Content>
        <GiftedChat
          inverted
          renderLoading={() => <Loading />}
          renderInputToolbar={props => (
            <InputToolbar
              {...props}
              containerStyle={styles.inputContainer}
              textInputStyle={styles.input}
            />
          )}
          renderBubble={props => <Message {...props} />}
          messages={messages}
          locale="pt-BR"
          alwaysShowSend
          showAvatarForEveryMessage={false}
          listViewProps={{ showsVerticalScrollIndicator: false }}
          placeholder=""
          onSend={typedMessage => onSend(typedMessage)}
          user={auth}
          renderSend={props => (
            <Send
              {...props}
              containerStyle={styles.sendContainer}
              textStyle={styles.sendLabelText}
              label="Enviar"
              disabled={!props.text.trim()}
            />
          )}
        />
      </Content>
    </Container>
  );
};

Chat.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        conversation: PropTypes.shape({
          _id: PropTypes.string.isRequired,
        }),
        user: PropTypes.shape({
          _id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          avatar: PropTypes.string.isRequired,
        }),
      }),
    }),
  }).isRequired,
  text: PropTypes.string,
};

Chat.defaultProps = {
  text: '',
};

export default Chat;
