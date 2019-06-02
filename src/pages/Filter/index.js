import React from 'react';
import {
  FormContainer, Input, Field, Wrapper, Title,
} from '~/components';
import Profile from '~/components/Profile';
import { Container, ButtonGroup } from './styles';
import Slider from '~/components/Slider';
import { Picker } from 'react-native';
import { THEME_COLORS } from '~/utils/constants';
import Button from '~/components/Button';
import GradientButton from '~/components/GradientButton';

const Filter = () => (
  <Container>
    <Profile title="Filtros" />
    <FormContainer withButton>
      <Input>
        <Wrapper>
          <Field size={14}>Tamanho do animal</Field>
          <ButtonGroup>
            <Button title="PEQUENO" onPress={() => console.log('open')} />
            <Button title="MÉDIO" active onPress={() => console.log('open')} />
            <Button title="GRANDE" onPress={() => console.log('open')} />
          </ButtonGroup>
        </Wrapper>
      </Input>
      <Input>
        <Wrapper>
          <Field>Sexo do animal</Field>

          <Picker
            selectedValue="java"
            style={{ height: 50, width: '100%', color: THEME_COLORS.BLACK }}
            onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}
          >
            <Picker.Item label="Macho" value="java" />
            <Picker.Item label="Femêa" value="js" />
          </Picker>
        </Wrapper>
      </Input>
      <Input>
        <Wrapper>
          <Field size={14}>Tipo de animal</Field>
          <ButtonGroup>
            <Button title="CÃES" active onPress={() => console.log('open')} />
            <Button title="GATOS" onPress={() => console.log('open')} />
            <Button title="TODOS" onPress={() => console.log('open')} />
          </ButtonGroup>
        </Wrapper>
      </Input>
      <Input>
        <Wrapper>
          <Field>Idade do animal (apartir de)</Field>
          <Slider
            minimum={1}
            maximum={15}
            value={3}
            valueText="anos"
            onChange={value => console.log(value)}
          />
        </Wrapper>
      </Input>
    </FormContainer>
    <GradientButton onPress={() => setFinishStep(false)}>
      <Title size={14} color="white">
        Aplicar Filtros
      </Title>
    </GradientButton>
  </Container>
);

export default Filter;
