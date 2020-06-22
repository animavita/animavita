import React from 'react';
import styled from 'styled-components/native';

import {Typography, ListItem, Button} from '../core';
import {Space, Container} from '../layout';

export default {
  title: 'List Item',
  component: ListItem,
};

const Wrapper = styled.View`
  width: 300px;
`;

export const GradientWithContent = () => (
  <Wrapper>
    <ListItem
      avatar={{
        source: {
          uri: 'https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg',
        },
      }}
      gradient>
      <Container direction="column" alignItems="flex-start">
        <Typography color="white" css={['font-weight: bold']} variant="title-3">
          Bruno Gustavo
        </Typography>
        <Typography color="white" variant="body">
          Solicitou uma adoção
        </Typography>
        <Space height={10} />
        <Container direction="row">
          <Button
            text="RECUSAR"
            onPress={() => ({})}
            textColor="red"
            size="small"
            style={{backgroundColor: 'white', borderRadius: 50, width: 100}}
          />
          <Space width={10} />
          <Button
            text="ACEITAR"
            onPress={() => ({})}
            textColor="#2ED68F"
            size="small"
            style={{backgroundColor: 'white', borderRadius: 50, width: 100}}
          />
        </Container>
      </Container>
    </ListItem>
  </Wrapper>
);

export const GradientWithChevron = () => (
  <Wrapper>
    <ListItem
      avatar={{
        source: {
          uri: 'https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg',
        },
      }}
      chevron
      gradient>
      <Container direction="column" alignItems="flex-start" css={['flex: 1']}>
        <Typography color="white" css={['font-weight: bold']} variant="title-3">
          Bruno Gustavo
        </Typography>
        <Typography color="white" variant="body">
          Solicitou uma adoção
        </Typography>
      </Container>
    </ListItem>
  </Wrapper>
);

export const LightStyle = () => (
  <Wrapper>
    <ListItem
      avatar={{
        source: {
          uri: 'https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg',
        },
      }}
      chevron>
      <Container direction="column" alignItems="flex-start">
        <Typography color="#2ED68F" css={['font-weight: bold']} variant="title-3">
          Bruno Gustavo
        </Typography>
      </Container>
    </ListItem>
  </Wrapper>
);
