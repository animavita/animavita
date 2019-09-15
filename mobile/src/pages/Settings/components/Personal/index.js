import React, { useState, useEffect } from 'react';
import {
  Small, FormContainer, Input, Field, Wrapper,
} from '~/components';
import { showMessage } from 'react-native-flash-message';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { TextInput, EditButton } from './styles';

const USER_CHANGE_NAME_MUTATION = gql`
  mutation UpdateUserNameMutation($name: String!, $lastname: String!) {
    UpdateUserNameMutation(input: { name: $name, lastname: $lastname }) {
      user {
        name
      }
    }
  }
`;

const Personal = ({ user }) => {
  const [fields, setFields] = useState({
    nameEditable: false,
    lastnameEditable: false,
  });

  const [updateName] = useMutation(USER_CHANGE_NAME_MUTATION, {
    onCompleted: () => {
      showMessage({
        message: 'Salvo com sucesso!',
        description: 'Os seus dados foram atualizados com sucesso!',
        type: 'success',
      });
    },
    onError: () => {
      showMessage({
        message: 'Erro na atualização de dados!',
        description:
          'Ops! Algum erro no momento da atualização dos dados aconteceu, tente novamente mais tarde.',
        type: 'danger',
      });
    },
  });

  useEffect(() => {
    setFields({
      ...fields,
      name: user.name,
      lastname: user.lastname,
    });
  }, [user]);

  function handleChange(field, enabled) {
    if (!enabled) {
      const { name, lastname } = fields;
      updateName({
        variables: {
          name,
          lastname,
        },
      });
    }

    setFields({
      ...fields,
      [field]: enabled,
    });
  }

  return (
    <FormContainer>
      <Input>
        <Wrapper>
          <Field>Nome</Field>
          <TextInput
            defaultValue={fields.name}
            editable={fields.nameEditable}
            onChangeText={text => setFields({
              ...fields,
              name: text,
            })
            }
          />
        </Wrapper>
        <EditButton onPress={() => handleChange('nameEditable', !fields.nameEditable)}>
          <Small>{fields.nameEditable ? 'Salvar' : 'Editar'}</Small>
        </EditButton>
      </Input>
      <Input>
        <Wrapper>
          <Field>Sobrenome</Field>
          <TextInput
            defaultValue={fields.lastname}
            editable={fields.lastnameEditable}
            onChangeText={text => setFields({
              ...fields,
              lastname: text,
            })
            }
          />
        </Wrapper>
        <EditButton onPress={() => handleChange('lastnameEditable', !fields.lastnameEditable)}>
          <Small>{fields.lastnameEditable ? 'Salvar' : 'Editar'}</Small>
        </EditButton>
      </Input>
      <Input>
        <Wrapper>
          <Field>E-mail</Field>
          <TextInput
            editable={false}
            defaultValue={user.email}
          />
        </Wrapper>
      </Input>
    </FormContainer>
  );
};

Personal.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
  }),
};

Personal.defaultProps = {
  user: {
    name: '',
    lastName: '',
    email: '',
  },
};

export default Personal;
