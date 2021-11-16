import React, {useCallback} from 'react';
import styled from 'styled-components/native';
import {Background, Space} from '@animavita/ui/layout';
import {Button, Header, Label, Input, ButtonGroup, Slider, Typography} from '@animavita/ui/core';
import {px2ddp, heightPercentageToDP} from '@animavita/theme';
import {useNavigation} from '@react-navigation/native';
import {useI18n} from '@animavita/i18n';
import {View} from 'react-native';

import {useAdoptionRegister} from './Controller';
import {getForm, InputData} from './form';

const Wrapper = styled.ScrollView`
  margin: 0 ${px2ddp(10)}px;
`;

const getInputElement = (data: InputData) => {
  switch (data.type) {
    case 'text':
      return <Input {...data} />;
    case 'slider':
      return <Slider {...data} />;
    case 'buttonGroup':
      return <ButtonGroup {...data} />;
  }
};

const AdoptionForm: React.FC = () => {
  const {RegisteredInput, submitData, errors} = useAdoptionRegister();
  const {goBack} = useNavigation();
  const {t} = useI18n(['register_adoption']);

  const formFields = getForm(t);

  const renderError = (name: string) => {
    const error = errors[name];

    if (!error) return;

    return (
      <Typography css={[`margin-bottom: ${px2ddp(4)}px;`]} variant="caption-1">
        {t('required_field')}
      </Typography>
    );
  };

  const renderFields = useCallback(() => {
    return formFields.map(item => (
      <View key={item.name}>
        <Label>{item.label}</Label>
        <RegisteredInput data={item} key={item.name}>
          {getInputElement(item)}
        </RegisteredInput>
        {renderError(item.name)}
      </View>
    ));
  }, [formFields]);

  return (
    <Background>
      <Header title={t('register_adoption')} onPrevious={goBack} />
      <Wrapper>
        <Space height={heightPercentageToDP('2%')} />

        {renderFields()}

        <Button
          testID="nextButton"
          text={t('next_step')}
          onPress={submitData}
          size="large"
          style={{marginTop: 30}}
          active
          rounded
        />
      </Wrapper>
    </Background>
  );
};

export default AdoptionForm;
