import React from 'react';
import {
  Small, FormContainer, Input, Field, Wrapper,
} from '~/components';
import PropTypes from 'prop-types';
import { TextInput } from './styles';

const Personal = ({ user }) => (
  <FormContainer>
    <Input>
      <Wrapper>
        <Field>Nome</Field>
        <TextInput defaultValue={user.name} onChangeText={text => console.log(text)} />
      </Wrapper>
      <Small>Editar</Small>
    </Input>
    <Input>
      <Wrapper>
        <Field>Sobrenome</Field>
        <TextInput defaultValue={user.lastName} onChangeText={text => console.log(text)} />
      </Wrapper>
      <Small>Editar</Small>
    </Input>
    <Input>
      <Wrapper>
        <Field>E-mail</Field>
        <TextInput
          editable={false}
          defaultValue={user.email}
          onChangeText={text => console.log(text)}
        />
      </Wrapper>
    </Input>
  </FormContainer>
);

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
