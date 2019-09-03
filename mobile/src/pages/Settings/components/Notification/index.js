import React from 'react';
import { Switch } from 'react-native';
import { THEME_COLORS } from '~/utils/constants';

import { FormContainer, Input, Field } from '~/components';

const Notification = () => (
  <FormContainer>
    <Input>
      <Field>Notificações</Field>
      <Switch
        value
        thumbColor={THEME_COLORS.SECONDARY}
        trackColor={{
          true: THEME_COLORS.SECONDARY,
        }}
        onValueChange={value => console.log(value)}
      />
    </Input>
    <Input>
      <Field>Eu sou um herói</Field>
      <Switch
        value
        thumbColor={THEME_COLORS.SECONDARY}
        trackColor={{
          true: THEME_COLORS.SECONDARY,
        }}
        onValueChange={value => console.log(value)}
      />
    </Input>
  </FormContainer>
);

export default Notification;
