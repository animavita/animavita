import React, { useState } from 'react';
import { GiftedChat, Send, InputToolbar } from 'react-native-gifted-chat';
import PropTypes from 'prop-types';
import { Avatar } from 'react-native-elements';
import Message from './components/Message';
import { H1 } from '~/components';
import Loading from '~/components/Loading';

import {
  Container, Header, Profile, Content, styles,
} from './styles';

const user = {
  name: 'Ada Lovelace',
  avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
};

const Chat = () => {
  const [messages, useMessages] = useState([
    {
      _id: 1,
      text: 'Hello developer',
      createdAt: new Date(),
      quickReplies: {
        type: 'radio', // or 'checkbox',
        keepIt: true,
        values: [
          {
            title: '😋 Yes',
            value: 'yes',
          },
          {
            title: '📷 Yes, let me show you with a picture!',
            value: 'yes_picture',
          },
          {
            title: '😞 Nope. What?',
            value: 'no',
          },
        ],
      },
      user: {
        _id: 2,
        name: 'Ada Lovelace',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      },
    },
  ]);
  function onSend(typedMessage) {
    useMessages(GiftedChat.append(messages, typedMessage));
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
      {!true ? (
        <Loading />
      ) : (
        <Content>
          <GiftedChat
            inverted
            scrollToBottom
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
            user={{
              _id: 1,
              name: 'Wendel Freitas',
            }}
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
      )}
    </Container>
  );
};

Chat.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
  }),
  text: PropTypes.string,
};

Chat.defaultProps = {
  user: {
    name: '',
    avatar: '',
  },
  text: '',
};

export default Chat;
