import React from 'react';
import {
  Small, FormContainer, Input, Field, Wrapper,
} from '~/components';
import PropTypes from 'prop-types';
import { TextInput } from './styles';

const Personal = ({ name, lastname, email }) => (
  <FormContainer>
    <Input>
      <Wrapper>
        <Field>Nome</Field>
        <TextInput defaultValue={name} onChangeText={text => console.log(text)} />
      </Wrapper>
      <Small>Editar</Small>
    </Input>
    <Input>
      <Wrapper>
        <Field>Sobrenome</Field>
        <TextInput defaultValue={lastname} onChangeText={text => console.log(text)} />
      </Wrapper>
      <Small>Editar</Small>
    </Input>
    <Input>
      <Wrapper>
        <Field>E-mail</Field>
        <TextInput editable={false} defaultValue={email} onChangeText={text => console.log(text)} />
      </Wrapper>
    </Input>
  </FormContainer>
);

Personal.propTypes = {
  name: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default Personal;
