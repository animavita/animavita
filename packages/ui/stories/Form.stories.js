import React from 'react';
import styled from 'styled-components/native';

import {Slider, Input, Label, Switch, Button} from '../core/';
import {Space, Container} from '../layout';

export default {
  title: 'Form',
  component: source,
};

const ButtonsWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const Wrapper = styled.View`
  width: 400px;
`;

export const source = () => (
  <Wrapper>
    <Container direction="column" alignItems="flex-start">
      <Label>Nome</Label>
      <Input placeholder="Digite o nome do animal" />
    </Container>
    <Space height={10} />
    <Container direction="column" alignItems="flex-start">
      <Label>Raça</Label>
      <Input placeholder="Digite a raça do animal" />
    </Container>
    <Space height={20} />
    <Container direction="column" alignItems="flex-start">
      <Label>Tipo de animal</Label>
      <Space height={10} />
      <ButtonsWrapper>
        <Button text="CÃO" size="small" outline rounded />
        <Button text="GATO" size="small" gradient rounded />
        <Button text="OUTRO" size="small" outline rounded />
      </ButtonsWrapper>
    </Container>
    <Space height={20} />
    <Container direction="column" alignItems="flex-start">
      <Label>Distância</Label>
      <Slider minimum={1} maximum={50} value={20} suffix="km" />
    </Container>
    <Space height={20} />
    <Container justifyContent="flex-start">
      <Label>Habilitar anúncio</Label>
      <Space width={10} />
      <Switch value={true} />
    </Container>
  </Wrapper>
);
