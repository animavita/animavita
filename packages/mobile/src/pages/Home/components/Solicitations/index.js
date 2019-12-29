import React, { useState } from 'react';
import { showMessage } from 'react-native-flash-message';
import { isEmpty } from '~/utils/helpers';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Loading from '~/components/Loading';
import ErrorContainer from '~/components/ErrorContainer';
import ListItem from '~/components/ListItem';
import Button from '~/components/Button';
import { Container, Subgroup, List } from './styles';
import { THEME_COLORS } from '~/utils/constants';

const GET_SOLICITATIONS_QUERY = gql`
  query getAllSolicitations($skip: Int, $first: Int) {
    solicitations(skip: $skip, first: $first) {
      _id
      adopt {
        name
      }
      user {
        name
        fullname
        avatar
      }
    }
  }
`;

const ACCEPT_OR_REFUSE_SOLICITATION_MUTATION = gql`
  mutation AcceptOrRefuseSolicitationMutation($solicitation: String!, $accepted: Boolean!) {
    AcceptOrRefuseSolicitationMutation(
      input: { solicitationId: $solicitation, accepted: $accepted }
    ) {
      solicitation {
        user {
          fullname
        }
      }
      accepted
    }
  }
`;

const Solicitations = () => {
  const [solicitations, setSolicitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { refetch } = useQuery(GET_SOLICITATIONS_QUERY, {
    variables: {
      skip: 0,
      first: 20,
    },
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      setSolicitations(data.solicitations);
      setLoading(false);
    },
    onError: () => {
      showMessage({
        message: 'Erro na listagem das solicitações!',
        description: 'Ops! Acho que está ocorrendo muitas solicitações, tente novamente mais tarde',
        type: 'danger',
      });
      setLoading(false);
    },
  });

  const [acceptOrRefuseSolicitation] = useMutation(ACCEPT_OR_REFUSE_SOLICITATION_MUTATION, {
    onCompleted: ({ AcceptOrRefuseSolicitationMutation }) => {
      const response = AcceptOrRefuseSolicitationMutation.accepted ? 'aceitou' : 'recusou';
      setLoading(true);
      refetch({
        variables: {
          skip: 0,
          first: 20,
        },
      });
      showMessage({
        message: 'Você respondeu a solicitação com sucesso!',
        description: `Você ${response} com sucesso a solicitação de adoção feita por ${
          AcceptOrRefuseSolicitationMutation.solicitation.user.fullname
        }, enviaremos uma notificação para avisar o usuário!`,
        type: 'success',
        duration: 4000,
        backgroundColor: THEME_COLORS.SECONDARY,
      });
    },
    onError: () => showMessage({
      message: 'Erro ao responder uma solicitação!',
      description:
          'Ops! Volte aqui mais tarde para responder a solicitação, não gostamos de deixar ninguém esperando :)!',
      type: 'danger',
    }),
  });

  function renderSolicitations() {
    if (isEmpty(solicitations)) {
      return (
        <ErrorContainer
          image={require('~/images/emptySolicitations.jpg')}
          title="Sua caixa de solicitações está vazia!"
          description={
            '\n Se você colocou um animal para adoção, \n não se preocupe, tenho certeza que é fofo e ele logo receberá uma solicitação de adoção.'
          }
        />
      );
    }

    return (
      <List>
        {solicitations.map(solicitation => (
          <ListItem
            key={solicitation._id}
            title={`${solicitation.user.fullname} fez uma solicitação para adotar ${
              solicitation.adopt.name
            }`}
            avatar={solicitation.user.avatar}
            onPress={() => null}
            chevron={false}
            subtitle={(
              <Subgroup>
                <Button
                  fontWeight="bold"
                  buttonColor="white"
                  borderColor="white"
                  title="ACEITAR"
                  onPress={() => acceptOrRefuseSolicitation({
                    variables: {
                      solicitation: solicitation._id,
                      accepted: true,
                    },
                  })
                  }
                />
                <Button
                  fontWeight="bold"
                  buttonColor="white"
                  borderColor="white"
                  fontColor="#FF6767"
                  title="RECUSAR"
                  onPress={() => acceptOrRefuseSolicitation({
                    variables: {
                      solicitation: solicitation._id,
                      accepted: false,
                    },
                  })
                  }
                />
              </Subgroup>
)}
          />
        ))}
      </List>
    );
  }

  return <Container>{loading ? <Loading /> : renderSolicitations()}</Container>;
};

export default Solicitations;
