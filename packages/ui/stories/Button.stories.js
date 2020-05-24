import React from 'react';
import styled from 'styled-components/native';

import Button from '../core/Button/Button';
import Space from '../layout/Space';

export default {
  title: 'Button',
  component: Button,
};

const Container = styled.View`
  width: 200px;
`;

export const outline = () => (
  <Container>
    <Button text="Outline" outline size="large" />
    <Space height={20} />
    <Button text="Outline rounded" rounded outline size="large" />
  </Container>
);

export const gradient = () => (
  <Container>
    <Button text="Gradient" gradient size="large" />
    <Space height={20} />
    <Button text="Gradient rounded" gradient rounded size="large" />
  </Container>
);

export const active = () => (
  <Container>
    <Button text="Not active" outline size="large" />
    <Space height={20} />
    <Button text="Active" gradient size="large" />
  </Container>
);

export const size = () => (
  <Container>
    <Button text="Gradient" gradient rounded size="small" />
    <Space height={20} />
    <Button text="Gradient rounded" outline rounded size="large" />
  </Container>
);

export const disabled = () => (
  <Container>
    <Button text="Large" type="primary" size="large" disabled />
    <Space height={10} />
    <Button text="Large" type="primary" size="small" disabled />
    <Space height={20} />
    <Button text="Outline" type="outline" size="large" disabled />
    <Space height={10} />
    <Button text="Outline" type="outline" size="small" disabled />
  </Container>
);
