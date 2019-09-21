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

  const adoptionFormSchema = Yup.object().shape({
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
      validationSchema={adoptionFormSchema}
    >
      { props => (
        <>
          <FormContainer showsVerticalScrollIndicator={false}>
            <Input>
              <Wrapper>
                <Field>Nome do animal</Field>
                <TextInput
                  style={styles.input}
                  placeholder="Digite o nome do animal"
                  value={props.values.name}
                  onChangeText={props.handleChange('name')}
                />
              </Wrapper>
            </Input>
            {props.errors.name && <Title size={12} weight="normal" color="red">{props.errors.name}</Title>}
            <Input>
              <Wrapper>
                <Field>Observações</Field>
                <TextInput
                  style={styles.input}
                  multiline
                  placeholder="Observações adicionais sobre o animal"
                  onChangeText={props.handleChange('observations')}
                />
              </Wrapper>
            </Input>
            {props.errors.observations && <Title size={10} weight="normal" color="red">{props.errors.observations}</Title>}
            <Input>
              <Wrapper>
                <Field size={14}>Tipo de animal</Field>
                <ButtonGroup>
                  {ANIMAL_TYPES.map(animal => (
                    <Button
                      key={animal.value}
                      title={animal.title}
                      active={props.values.animal === animal.value}
                      onPress={() => props.setFieldValue('animal', animal.value)}
                    />
                  ))}
                </ButtonGroup>
              </Wrapper>
            </Input>
            {props.errors.animal && <Title size={12} weight="normal" color="red">{props.errors.animal}</Title>}
            <Input>
              <Wrapper>
                <Field>Idade do animal (aproximadamente)</Field>
                <Slider
                  minimum={1}
                  maximum={15}
                  value={props.values.age}
                  valueText={props.values.age > 1 ? 'anos' : 'ano'}
                  onChange={props.handleChange('age')}
                />
              </Wrapper>
            </Input>
            {props.errors.age && <Title size={12} weight="normal" color="red">{props.errors.age}</Title>}
            <Input>
              <Wrapper>
                <Field>Sexo do animal</Field>
                <Picker
                  selectedValue={props.values.sex}
                  style={styles.picker}
                  onValueChange={value => props.setFieldValue('sex', value)}
                >
                  <Picker.Item label="Selecione o sexo do animal" value="" />
                  <Picker.Item label="Macho" value="male" />
                  <Picker.Item label="Femêa" value="female" />
                </Picker>
              </Wrapper>
            </Input>
            {props.errors.sex && <Title size={12} weight="normal" color="red">{props.errors.sex}</Title>}

            <Input>
              <Wrapper>
                <Field size={14}>Porte do animal</Field>
                <ButtonGroup>
                  {ANIMAL_SIZES.map(size => (
                    <Button
                      key={size.value}
                      title={size.title}
                      active={props.values.size === size.value}
                      onPress={() => props.setFieldValue('size', size.value)}
                    />

                  ))}
                </ButtonGroup>
              </Wrapper>
            </Input>
            {props.errors.size && <Title size={12} weight="normal" color="red">{props.errors.size}</Title>}
          </FormContainer>
          <GradientButton disabled={false} onPress={props.handleSubmit}>
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
  errors: PropTypes.shape(adoptProps),
  values: PropTypes.shape(adoptProps),
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  setFieldValue: PropTypes.func,
  setData: PropTypes.func.isRequired,
  data: PropTypes.shape(adoptProps).isRequired,
  setStep: PropTypes.func.isRequired,
};

AdoptionForm.defaultProps = {
  errors: {},
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  setFieldValue: PropTypes.func,
  values: {
    name: '',
    observations: '',
    animal: '',
    sex: '',
    age: 1,
    size: '',
  },
};

export default AdoptionForm;
