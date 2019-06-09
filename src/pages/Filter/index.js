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
import useForm from '~/hooks/useForm';

const Filter = () => {
  const [values, handleChange, handleSubmit] = useForm({ age: 1 });

  return (
    <Container>
      <Profile title="Filtros" />
      <FormContainer withButton>
        <Input>
          <Wrapper>
            <Field size={14}>Tamanho do animal</Field>
            <ButtonGroup>
              <Button
                title="PEQUENO"
                active={values.size === 'small'}
                onPress={() => handleChange('size', 'small')}
              />
              <Button
                title="MÉDIO"
                active={values.size === 'medium'}
                onPress={() => handleChange('size', 'medium')}
              />
              <Button
                title="GRANDE"
                active={values.size === 'bigger'}
                onPress={() => handleChange('size', 'bigger')}
              />
            </ButtonGroup>
          </Wrapper>
        </Input>
        <Input>
          <Wrapper>
            <Field>Sexo do animal</Field>

            <Picker
              selectedValue={values.sex}
              style={{ height: 50, width: '100%', color: THEME_COLORS.BLACK }}
              onValueChange={value => handleChange('sex', value)}
            >
              <Picker.Item label="Macho" value="male" />
              <Picker.Item label="Femêa" value="female" />
            </Picker>
          </Wrapper>
        </Input>
        <Input>
          <Wrapper>
            <Field size={14}>Tipo de animal</Field>
            <ButtonGroup>
              <Button
                title="CÃES"
                active={values.type === 'dogs'}
                onPress={() => handleChange('type', 'dogs')}
              />
              <Button
                title="GATOS"
                active={values.type === 'cats'}
                onPress={() => handleChange('type', 'cats')}
              />
              <Button
                title="OUTROS"
                active={values.type === 'others'}
                onPress={() => handleChange('type', 'others')}
              />
            </ButtonGroup>
          </Wrapper>
        </Input>
        <Input>
          <Wrapper>
            <Field>Idade do animal (apartir de)</Field>
            <Slider
              minimum={1}
              maximum={15}
              value={values.age}
              valueText={values.age > 1 ? 'anos' : 'ano'}
              onChange={value => handleChange('age', value)}
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
};

export default Filter;
