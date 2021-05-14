import React, {useState} from 'react';
import Button from '@animavita/ui/core/Button/Button';
import {Background} from '@animavita/ui/layout';
import {useNavigation} from '@react-navigation/native';
import {default as Slider} from '@animavita/ui/core/Form/Slider';
import Input from '@animavita/ui/core/Form/Input';
import Label from '@animavita/ui/core/Form/Label';
import DropDownPicker from 'react-native-dropdown-picker';
import {Formik} from 'formik';
import * as Yup from 'yup';

import Header from '../Header';
import Error from '../Error';

import {
  Wrapper,
  ScrollViewContainer,
  LabelView,
  LabelText,
  ButtonsView,
  PortButtonsView,
  TypeButton,
  TypeButtons,
  TypeText,
  PortButtons,
  PortButton,
  PortText,
} from './styles';
import {registerForm} from './registerForm';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('O campo nome é obrigatório!'),
  race: Yup.string().required('O campo raça é obrigatório!'),
  observations: Yup.string().required('O campo observações é obrigatório!'),
  gender: Yup.string().required('É obrigatório escolher o sexo do animal!'),
  animalsSize: Yup.string().required('É obrigatório escolher um tipo de animal!'),
  animalsType: Yup.string().required('Escolha o tamanho do animal!'),
});

const LARGE = 'large';

interface Values {
  gender: string;
  observations: string;
  race: string;
  name: string;
  age: number;
  animalsType: string;
  animalsSize: string;
}

interface Props {
  onSubmit: (values: Values) => void;
}

const Register: React.FC<Props> = ({onSubmit}) => {
  const [age, setAge] = useState(1);
  const navigation = useNavigation();
  const [animalsType, setAnimalsType] = useState([
    {value: 'Cao', checked: false},
    {value: 'Gato', checked: false},
    {value: 'OUTRO', checked: false},
  ]);
  const [animalsSize, setAnimalsSize] = useState([
    {value: 'PEQUENO', checked: false},
    {value: 'MÉDIO', checked: false},
    {value: 'GRANDE', checked: false},
  ]);

  function handleSelectedAnimalType(animal: string) {
    const animalsTypeUpdated = [...animalsType];

    animalsTypeUpdated.forEach(animalUpdated => {
      if (animalUpdated.value === animal) {
        animalUpdated.checked = true;
      } else {
        animalUpdated.checked = false;
      }
    });

    setAnimalsType(animalsTypeUpdated);
  }

  function handleSelectedAnimalSize(animal: string) {
    const animalsSizeUpdated = [...animalsSize];

    animalsSizeUpdated.forEach(animalUpdated => {
      if (animalUpdated.value === animal) {
        animalUpdated.checked = true;
      } else {
        animalUpdated.checked = false;
      }
    });

    setAnimalsSize(animalsSizeUpdated);
  }

  function nextScreen(errors) {
    {
      errors ? '' : navigation.navigate('RegisterSecondStep');
    }
  }

  return (
    <Background>
      <Wrapper>
        <Header />
        <Formik<Values>
          initialValues={{name: '', race: '', observations: '', gender: '', age, animalsType: '', animalsSize: ''}}
          validationSchema={validationSchema}
          onSubmit={value => {
            onSubmit(value);
          }}>
          {({handleChange, handleSubmit, values, errors, setFieldValue}) => (
            <>
              <ScrollViewContainer>
                {registerForm.map((field, index) => (
                  <>
                    <Label>{field.label}</Label>
                    <Input
                      key={index}
                      placeholder={field.placeholder}
                      onChangeText={handleChange(field.name)}
                      value={values[field.name]}
                    />
                    {errors && <Error>{errors[field.name]}</Error>}
                  </>
                ))}
                <LabelView>
                  <LabelText>Tipo de Animal</LabelText>
                </LabelView>
                <ButtonsView>
                  {animalsType.map((animal, index) => {
                    return (
                      <TypeButtons
                        key={index}
                        start={{x: 0, y: 0.5}}
                        end={{x: 1, y: 0.5}}
                        colors={['#17D4B4', '#36EE8C']}
                        isAnimalChecked={animal.checked}>
                        <TypeButton
                          key={index}
                          onPress={() => {
                            handleSelectedAnimalType(animal.value);
                            setFieldValue('animalsType', animal.value);
                          }}
                          isAnimalChecked={animal.checked}>
                          <TypeText key={index} isAnimalChecked={animal.checked}>
                            {animal.value}
                          </TypeText>
                        </TypeButton>
                      </TypeButtons>
                    );
                  })}
                </ButtonsView>
                {errors.animalsType && <Error>{errors.animalsType}</Error>}
                <LabelView>
                  <LabelText>Idade do animal (aproximadamente)</LabelText>
                </LabelView>
                <Slider
                  minimum={1}
                  maximum={50}
                  value={age}
                  suffix={age > 1 ? 'anos' : 'ano'}
                  onValueChange={value => setAge(Math.floor(value))}
                />
                <LabelView>
                  <LabelText>Sexo do animal</LabelText>
                </LabelView>
                <DropDownPicker
                  items={[
                    {
                      label: 'Macho',
                      value: 'Macho',
                    },
                    {
                      label: 'Femêa',
                      value: 'Femêa',
                    },
                  ]}
                  itemStyle={{justifyContent: 'flex-start'}}
                  placeholder="Selecione o sexo do animal"
                  labelStyle={{
                    color: '#000',
                  }}
                  multiple={false}
                  multipleText="%d items have been selected."
                  containerStyle={{height: 44, borderRadius: 8, marginBottom: 16, marginTop: 10}}
                  onChangeItem={handleChange('gender')}></DropDownPicker>
                {errors.gender && <Error>{errors.gender}</Error>}
                <LabelView>
                  <LabelText>Porte do animal</LabelText>
                </LabelView>
                <PortButtonsView>
                  {animalsSize.map((animal, index) => {
                    return (
                      <PortButtons
                        key={index}
                        start={{x: 0, y: 0.5}}
                        end={{x: 1, y: 0.5}}
                        colors={['#17D4B4', '#36EE8C']}
                        isAnimalChecked={animal.checked}>
                        <PortButton
                          key={index}
                          onPress={() => {
                            handleSelectedAnimalSize(animal.value);
                            setFieldValue('animalsSize', animal.value);
                          }}
                          isAnimalChecked={animal.checked}>
                          <PortText key={index} isAnimalChecked={animal.checked}>
                            {animal.value}
                          </PortText>
                        </PortButton>
                      </PortButtons>
                    );
                  })}
                </PortButtonsView>
                {errors.animalsSize && <Error>{errors.animalsSize}</Error>}
              </ScrollViewContainer>
              <Button
                onPress={() => [handleSubmit(), nextScreen(errors)]}
                text={'Próxima Etapa'}
                size={LARGE}
                gradient={true}
                rounded={true}
                active={false}
              />
            </>
          )}
        </Formik>
      </Wrapper>
    </Background>
  );
};

export default Register;
