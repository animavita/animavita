import React,{useRef, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useQuery, useSubscription } from 'react-apollo-hooks';
import { Text, FlatList, KeyboardAvoidingView } from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import Message from './components/Message';
import Input from './components/Input';
import { H1 } from '~/components';
import Loading from '~/components/Loading';

import { Container, Header, Profile, Content } from './styles';

const message = {
  fontSize: 12,
  textAlign: 'left',
  color: '#ffffff',
  backgroundColor: 'transparent',
};

const user = {
  name: 'Ada Lovelace',
  avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
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
    Message(filter:{
      mutation_in: CREATED, node:{
        from_not: "Wendel Freitas",

      }
    }){
      node{
        from
        message
      }
    }

  }
`;

const Chat = () => {
  const [messages, useMessages] = useState([]);
  const ref = useRef();

  const { data, error, loading } = useQuery(GET_CONVERSATION_MESSAGES_QUERY, {
    variables: {
      id: 'cjxjllghd96ec0162kjwb0ft0',
    },

  
  });


  const { data: subData, error: subError, loading: subloading } = useSubscription(NEW_MESSAGES_SUBSCRIPTION);

  function renderItem({ item }) {
    return (
      <Message key={item.id} from={item.from}>
        <Text style={message}>{item.message}</Text>
      </Message>
    );
  }

  useEffect(() => {
    if (data && data.Conversation) {
      useMessages(data.Conversation.messages);
    }
  }, [data]);

  useEffect(() => {
    ref.current.scrollToEnd();
  });

  function addMesageTest() {
    if (data && data.Conversation) {
      data.Conversation.messages.push({
        id: Math.random(),
        from: 'Wendel Freitas',
        message: 'Testing',
      });
    }

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
      {loading ? (
        <Loading />
      ) : (
        <Container behavior={null}>
          <FlatList
            data={messages}
            renderItem={renderItem}
            ref={ref}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
          />
        </Container>
      )}
      <Button title="oi" onPress={() => addMesageTest()}/>
      <Input onAddMessage={console.log('oi')} />
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
    avatar: '',
  },
};

export default Chat;
