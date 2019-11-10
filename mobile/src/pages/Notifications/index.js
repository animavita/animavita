import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
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

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchMoreLoading, setfetchMoreLoading] = useState(false);

  const { data, fetchMore } = useQuery(GET_CONVERSATIONS_QUERY, {
    variables: {
      skip: 0,
      first: 10,
    },
    fetchPolicy: 'no-cache',
    onCompleted: (response) => {
      setNotifications(response.conversations);
      setLoading(false);
    },
    onError: () => {
      showMessage({
        message: 'Erro na listagem de conversas!',
        description: 'Ops! Algum erro aconteceu, tente novamente mais tarde!',
        type: 'danger',
      });
      setLoading(false);
    },
  });

  function fetchMoreConversations() {
    if (notifications.length >= 10) {
      setfetchMoreLoading(true);
      fetchMore({
        variables: {
          skip: data.conversations.length,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          setfetchMoreLoading(false);
          if (!fetchMoreResult) return prev;
          return setNotifications([...prev.conversations, ...fetchMoreResult.conversations]);
        },
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
    if (isEmpty(notifications)) {
      return (
        <ErrorContainer
          image={require('~/images/emptyNotifications.jpg')}
          title={'\nSua caixa de notificações está vazia!'}
          description={
            '\n Hmmm, acho que não temos nada para te contar... Na verdade temos sim, você sabia que ter um pet reduz a chance de depressão e o stress? \nEles são incríveis e fofos.'
          }
        />
      );
    }

    return (
      <FlatList
        data={notifications}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: conversation }) => (
          <ListItem
            title="Bruno Gustavo"
            subtitle="enviou uma solicitação para adotar Luke!"
            onPress={() => null}
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
      <Profile title="Notificações" />
      <Content>{loading ? <Loading /> : renderContent()}</Content>
    </Container>
  );
};

export default Notifications;
