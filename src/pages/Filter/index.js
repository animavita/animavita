import React from 'react';
import {
  FormContainer, Input, Field, Wrapper, Title,
} from '~/components';
import { useSelector, useDispatch } from 'react-redux';

import Profile from '~/components/Profile';
import Slider from '~/components/Slider';
import { Picker } from 'react-native';
import { THEME_COLORS } from '~/utils/constants';
import Button from '~/components/Button';
import GradientButton from '~/components/GradientButton';
import useForm from '~/hooks/useForm';
import { Creators as FilterCreators } from '~/store/ducks/filter';
import { Container, ButtonGroup, Footer, ClearText } from './styles';


const Filter = ({ navigation }) => {
  const filters = useSelector(state => state.filter);
  const [values, handleChange, handleSubmit, resetValues, disabled] = useForm(filters);
  const dispatch = useDispatch();

  function setFilters() {
    dispatch(FilterCreators.setFilters(values));
    navigation.goBack();
  }

  function clearFilters() {
    resetValues();
    dispatch(FilterCreators.clearFilters());
  }
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
              value={values.age_lte}
              valueText={values.age_lte > 1 ? 'anos' : 'ano'}
              onChange={value => handleChange('age_lte', value)}
            />
          </Wrapper>
        </Input>
      </FormContainer>
      <Footer>

        <GradientButton disabled={disabled} onPress={() => setFilters()}>
          <Title size={14} color="white">
            Aplicar Filtros
          </Title>
        </GradientButton>
        <ClearText onPress={() => clearFilters()}>
          <Title size={12} color={THEME_COLORS.GREY} weight="normal">
            Limpar Filtros
          </Title>
        </ClearText>
      </Footer>
    </Container>
  );
};

export default Filter;
