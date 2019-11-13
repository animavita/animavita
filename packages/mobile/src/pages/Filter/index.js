import React from 'react';
import {
  FormContainer, Input, Field, Wrapper, Title,
} from '~/components';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Profile from '~/components/Profile';
import Slider from '~/components/Slider';
import { Picker } from 'react-native';
import { THEME_COLORS, ANIMAL_SIZES, ANIMAL_TYPES } from '~/utils/constants';
import Button from '~/components/Button';
import GradientButton from '~/components/GradientButton';
import useForm from '~/hooks/useForm';
import { Creators as FilterCreators } from '~/store/ducks/filter';
import {
  Container, ButtonGroup, Footer, ClearText, styles,
} from './styles';

const Filter = ({ navigation }) => {
  const filters = useSelector(state => state.filter);
  const [values, handleChange, resetValues, disabled] = useForm(filters);
  const dispatch = useDispatch();

  function setFilters() {
    dispatch(FilterCreators.setFilters(values));
    navigation.goBack();
  }

  function clearFilters() {
    resetValues();
    dispatch(FilterCreators.clearFilters());
    navigation.goBack();
  }
  return (
    <Container>
      <Profile title="Filtros" />
      <FormContainer withButton>
        <Input>
          <Wrapper>
            <Field size={14}>Tamanho do animal</Field>
            <ButtonGroup>
              {ANIMAL_SIZES.map(size => (
                <Button
                  key={size.value}
                  title={size.title}
                  active={values.size === size.value}
                  onPress={() => handleChange('size', size.value)}
                />
              ))}
            </ButtonGroup>
          </Wrapper>
        </Input>
        <Input>
          <Wrapper>
            <Field>Distância máxima</Field>
            <Slider
              minimum={10}
              maximum={60}
              value={values.distance}
              valueText="km"
              onChange={value => handleChange('distance', value)}
            />
          </Wrapper>
        </Input>
        <Input>
          <Wrapper>
            <Field>Sexo do animal</Field>

            <Picker
              selectedValue={values.gender}
              style={styles.picker}
              onValueChange={value => handleChange('gender', value)}
            >
              <Picker.Item label="Sem preferência" value="" />
              <Picker.Item label="Macho" value="male" />
              <Picker.Item label="Fêmea" value="female" />
            </Picker>
          </Wrapper>
        </Input>
        <Input>
          <Wrapper>
            <Field size={14}>Tipo de animal</Field>
            <ButtonGroup>
              {ANIMAL_TYPES.map(type => (
                <Button
                  key={type.value}
                  title={type.title}
                  active={values.type === type.value}
                  onPress={() => handleChange('type', type.value)}
                />
              ))}
            </ButtonGroup>
          </Wrapper>
        </Input>
        <Input>
          <Wrapper>
            <Field>Idade do animal (apartir de)</Field>
            <Slider
              minimum={1}
              maximum={15}
              value={values.age_gte}
              valueText={values.age_gte > 1 ? 'anos' : 'ano'}
              onChange={value => handleChange('age_gte', value)}
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

Filter.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Filter;
