import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, Picker } from 'react-native';
import * as Yup from 'yup';
import {
  Input, Field, Wrapper, Title,
} from '~/components';
import { Formik } from 'formik';
import Slider from '~/components/Slider';
import Button from '~/components/Button';
import { FormContainer, ButtonGroup, styles } from './styles';
import GradientButton from '~/components/GradientButton';
import { ANIMAL_TYPES, ANIMAL_SIZES } from '~/utils/constants';

const AdoptionForm = ({ setData, data, setStep }) => {
  const state = {
    name: '',
    observations: '',
    animal: '',
    sex: '',
    age: 1,
    size: '',
  };

  const schema = Yup.object().shape({
    name: Yup.string().required('O campo nome é obrigatório!'),
    observations: Yup.string().trim('O campo observações não pode conter apenas espaços!'),
    animal: Yup.string().required('É obrigatório escolher um tipo de animal!'),
    sex: Yup.string().trim().required('É obrigatório escolher o sexo do animal!'),
    size: Yup.string().required('Escolha o tamanho do animal!'),
  });

  function handleSubmit(formData) {
    setData(formData);
    setStep(1);
  }
  return (
    <Formik
      initialValues={data.name ? data : state}
      onSubmit={values => handleSubmit(values)}
      validationSchema={schema}
    >
      {({
        errors, values, setFieldValue, handleChange,
      }) => (
        <>
          <FormContainer showsVerticalScrollIndicator={false}>
            <Input>
              <Wrapper>
                <Field>Nome do animal</Field>
                <TextInput
                  style={styles.input}
                  placeholder="Digite o nome do animal"
                  value={values.name}
                  onChangeText={handleChange('name')}
                />
              </Wrapper>
            </Input>
            {errors.name && <Title size={12} weight="normal" color="red">{errors.name}</Title>}
            <Input>
              <Wrapper>
                <Field>Observações</Field>
                <TextInput
                  style={styles.input}
                  multiline
                  placeholder="Observações adicionais sobre o animal"
                  onChangeText={handleChange('observations')}
                />
              </Wrapper>
            </Input>
            {errors.observations && <Title size={10} weight="normal" color="red">{errors.observations}</Title>}
            <Input>
              <Wrapper>
                <Field size={14}>Tipo de animal</Field>
                <ButtonGroup>
                  {ANIMAL_TYPES.map(animal => (
                    <Button
                      key={animal.value}
                      title={animal.title}
                      active={values.animal === animal.value}
                      onPress={() => setFieldValue('animal', animal.value)}
                    />
                  ))}
                </ButtonGroup>
              </Wrapper>
            </Input>
            {errors.animal && <Title size={12} weight="normal" color="red">{errors.animal}</Title>}
            <Input>
              <Wrapper>
                <Field>Idade do animal (aproximadamente)</Field>
                <Slider
                  minimum={1}
                  maximum={15}
                  value={values.age}
                  valueText={values.age > 1 ? 'anos' : 'ano'}
                  onChange={handleChange('age')}
                />
              </Wrapper>
            </Input>
            {errors.age && <Title size={12} weight="normal" color="red">{errors.age}</Title>}
            <Input>
              <Wrapper>
                <Field>Sexo do animal</Field>
                <Picker
                  selectedValue={values.sex}
                  style={styles.picker}
                  onValueChange={value => setFieldValue('sex', value)}
                >
                  <Picker.Item label="Selecione o sexo do animal" value="" />
                  <Picker.Item label="Macho" value="male" />
                  <Picker.Item label="Femêa" value="female" />
                </Picker>
              </Wrapper>
            </Input>
            {errors.sex && <Title size={12} weight="normal" color="red">{errors.sex}</Title>}

            <Input>
              <Wrapper>
                <Field size={14}>Porte do animal</Field>
                <ButtonGroup>
                  {ANIMAL_SIZES.map(size => (
                    <Button
                      key={size.value}
                      title={size.title}
                      active={values.size === size.value}
                      onPress={() => setFieldValue('size', size.value)}
                    />

                  ))}
                </ButtonGroup>
              </Wrapper>
            </Input>
            {errors.size && <Title size={12} weight="normal" color="red">{errors.size}</Title>}
          </FormContainer>
          <GradientButton disabled={false} onPress={handleSubmit}>
            <Title size={14} color="white">
              Próxima Etapa
            </Title>
          </GradientButton>
        </>
      )}
    </Formik>

  );
};


const adoptProps = {
  name: PropTypes.string,
  observations: PropTypes.string,
  animal: PropTypes.string,
  age: PropTypes.number,
  sex: PropTypes.string,
  size: PropTypes.string,
};

AdoptionForm.propTypes = {
  setData: PropTypes.func.isRequired,
  data: PropTypes.shape(adoptProps).isRequired,
  setStep: PropTypes.func.isRequired,
};
export default AdoptionForm;
