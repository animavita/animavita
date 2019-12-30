import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import PropTypes from 'prop-types';
import Loading from '~/components/Loading';
import ListItem from '~/components/ListItem';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { showMessage } from 'react-native-flash-message';
import Profile from '~/components/Profile';
import ErrorContainer from '~/components/ErrorContainer';

import { Container, Content, styles } from './styles';
import { isEmpty } from '~/utils/helpers';

const GET_CONVERSATIONS_QUERY = gql`
  query getAllConversations($skip: Int, $first: Int) {
    conversations(skip: $skip, first: $first) {
      _id
      lastMessage {
        text
      }
      members {
        _id
        fullname
        avatar
      }
    }
  }
`;

const Messages = ({ navigation }) => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchMoreLoading, setfetchMoreLoading] = useState(false);

  const { data, fetchMore } = useQuery(GET_CONVERSATIONS_QUERY, {
    variables: {
      skip: 0,
      first: 10
    },
    fetchPolicy: 'no-cache',
    onCompleted: (response) => {
      setConversations(response.conversations);
      setLoading(false);
    },
    onError: () => {
      showMessage({
        message: 'Erro na listagem de conversas!',
        description: 'Ops! Algum erro aconteceu, tente novamente mais tarde!',
        type: 'danger'
      });
      setLoading(false);
    }
  });

  function fetchMoreConversations() {
    if (conversations.length >= 10) {
      setfetchMoreLoading(true);
      fetchMore({
        variables: {
          skip: data.conversations.length
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          setfetchMoreLoading(false);
          if (!fetchMoreResult) return prev;
          return setConversations([...prev.conversations, ...fetchMoreResult.conversations]);
        }
      });
    }
  }

  function renderFooter() {
    if (!fetchMoreLoading) return null;
    return (
      <View style={styles.loadingContainer}>
        <Loading size={25} />
      </View>
    );
  }

  function renderContent() {
    if (isEmpty(conversations)) {
      return (
        <ErrorContainer
          image={require('~/images/emptyMessages.jpg')}
          title="Sua caixa de mensagens está vazia!"
          description={
            '\n O chat fica disponível apenas após uma solicitação de adoção, sabemos o quanto você gostaria de conversar sobre seu pet, vamos trabalhar nisso para o futuro.'
          }
        />
      );
    }
    return (
      <FlatList
        data={conversations}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: conversation }) => (
          <ListItem
            title={conversation.members[0].fullname}
            onPress={() => navigation.navigate('Chat', {
              conversation: {
                _id: conversation._id
              },
              user: {
                _id: conversation.members[0]._id,
                name: conversation.members[0].fullname,
                avatar: conversation.members[0].avatar
              }
            })
            }
            avatar={conversation.members[0].avatar}
          />
        )}
        keyExtractor={conversation => conversation._id}
        onEndReached={fetchMoreConversations}
        onEndReachedThreshold={0.2}
        ListFooterComponent={renderFooter}
      />
    );
  }

  return (
    <Container>
      <Profile title="Mensagens" />
      <Content>{loading ? <Loading /> : renderContent()}</Content>
    </Container>
  );
};

Messages.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

export default Messages;
