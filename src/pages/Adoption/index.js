import React, { useState } from 'react';
import {
  Input, Field, Wrapper, Title,
} from '~/components';
import { TextInput, Picker } from 'react-native';
import {
  Container, FormContainer, PhotoContainer, ButtonGroup, styles,
} from './styles';

import Profile from '~/components/Profile';
import Slider from '~/components/Slider';
import Button from '~/components/Button';

import GradientButton from '~/components/GradientButton';
import useForm from '~/hooks/useForm';

const Adoption = () => {
  const [values, handleChange, handleSubmit] = useForm({ age: 1 });
  const [isFinishStep, setFinishStep] = useState(false);

  return (
    <Container>
      <Profile title="Cadastrar Adoção" />
      {!isFinishStep ? (
        <FormContainer showsVerticalScrollIndicator={false}>
          <Input>
            <Wrapper>
              <Field>Nome do animal</Field>
              <TextInput
                style={styles.input}
                placeholder="Gaia"
                value={values.name}
                onChangeText={text => handleChange('name', text)}
              />
            </Wrapper>
          </Input>
          <Input>
            <Wrapper>
              <Field>Observações</Field>
              <TextInput
                style={styles.input}
                multiline
                placeholder="Observações adicionais sobre o animal"
                onChangeText={text => console.log(text)}
              />
            </Wrapper>
          </Input>
          <Input>
            <Wrapper>
              <Field size={14}>Tipo de animal</Field>
              <ButtonGroup>
                <Button
                  title="CÃO"
                  active={values.animal === 'dog'}
                  onPress={() => handleChange('animal', 'dog')}
                />
                <Button
                  title="GATO"
                  active={values.animal === 'cat'}
                  onPress={() => handleChange('animal', 'cat')}
                />
                <Button
                  title="OUTRO"
                  active={values.animal === 'other'}
                  onPress={() => handleChange('animal', 'other')}
                />
              </ButtonGroup>
            </Wrapper>
          </Input>

          <Input>
            <Wrapper>
              <Field>Sexo do animal</Field>
              <Picker
                selectedValue={values.sex}
                style={styles.picker}
                onValueChange={value => handleChange('sex', value)}
              >
                <Picker.Item label="Macho" value="male" />
                <Picker.Item label="Femêa" value="female" />
              </Picker>
            </Wrapper>
          </Input>
          <Input>
            <Wrapper>
              <Field>Idade do animal (aproximadamente)</Field>
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
      ) : (
        <PhotoContainer>
          <Input>
            <Wrapper>
              <Field size={14}>Porte do Animal</Field>
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
        </PhotoContainer>
      )}

      {!isFinishStep ? (
        <GradientButton onPress={() => setFinishStep(true)}>
          <Title size={14} color="white">
            Próxima Etapa
          </Title>
        </GradientButton>
      ) : (
        <GradientButton onPress={() => setFinishStep(false)}>
          <Title size={14} color="white">
            Finalizar
          </Title>
        </GradientButton>
      )}
    </Container>
  );
};
export default Adoption;
