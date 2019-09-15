import React, { useState } from 'react';
import { Switch } from 'react-native';
import { THEME_COLORS } from '~/utils/constants';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { FormContainer, Input, Field } from '~/components';
import PropTypes from 'prop-types';

const USER_CHANGE_SETTING_MUTATION = gql`
  mutation ChangeSettingMutation($option: String!) {
    ChangeSettingMutation(input: { option: $option }) {
      user {
        hero
        notifications
      }
    }
  }
`;

const Notification = ({ user }) => {
  const [settings, setSettings] = useState({
    notifications: user.notifications,
    hero: user.hero,
  });
  const [changeSetting] = useMutation(USER_CHANGE_SETTING_MUTATION, {
    onCompleted: ({ ChangeSettingMutation }) => {
      setSettings(ChangeSettingMutation.user);
    },
  });

  return (
    <FormContainer>
      <Input>
        <Field>Notificações</Field>
        <Switch
          value={settings.notifications}
          thumbColor={THEME_COLORS.SECONDARY}
          trackColor={{
            true: THEME_COLORS.SECONDARY,
          }}
          onValueChange={() => changeSetting({ variables: { option: 'notifications' } })}
        />
      </Input>
      <Input>
        <Field>Eu sou um herói</Field>
        <Switch
          value={settings.hero}
          thumbColor={THEME_COLORS.SECONDARY}
          trackColor={{
            true: THEME_COLORS.SECONDARY,
          }}
          onValueChange={() => changeSetting({ variables: { option: 'hero' } })}
        />
      </Input>
    </FormContainer>
  );
};

Notification.propTypes = {
  user: PropTypes.shape({
    hero: PropTypes.bool,
    notifications: PropTypes.bool,
  }).isRequired,
};

export default Notification;
