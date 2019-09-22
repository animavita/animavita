import React, { useState } from 'react';
import { Switch } from 'react-native';
import { THEME_COLORS } from '~/utils/constants';
import { useDispatch } from 'react-redux';
import { Creators as AuthCreators } from '~/store/ducks/auth';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { FormContainer, Input, Field } from '~/components';
import PropTypes from 'prop-types';
import { showMessage } from 'react-native-flash-message';

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

const Configuration = ({ user }) => {
  const [settings, setSettings] = useState({
    notifications: user.notifications,
    hero: user.hero,
    field: '',
  });
  const dispatch = useDispatch();

  const [changeSetting] = useMutation(USER_CHANGE_SETTING_MUTATION, {
    onCompleted: ({ ChangeSettingMutation }) => {
      dispatch(
        AuthCreators.setAuth({
          ...user,
          [settings.field]: ChangeSettingMutation.user[settings.field],
        }),
      );
    },
    onError: () => {
      setSettings({
        notifications: user.notifications,
        hero: user.hero,
      });
      showMessage({
        message: 'Erro ao salvar configuração!',
        description:
          'Ops! Algum erro no momento da atualização da configuração aconteceu, tente novamente mais tarde.',
        type: 'danger',
      });
    },
  });

  function updateUserConfig(args, config) {
    setSettings({
      ...settings,
      [config]: !settings[config],
      field: config,
    });
    changeSetting(args);
  }

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
          onValueChange={() => updateUserConfig({ variables: { option: 'notifications' } }, 'notifications')
          }
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
          onValueChange={() => updateUserConfig({ variables: { option: 'hero' } }, 'hero')}
        />
      </Input>
    </FormContainer>
  );
};

Configuration.propTypes = {
  user: PropTypes.shape({
    hero: PropTypes.bool,
    notifications: PropTypes.bool,
  }).isRequired,
};

export default Configuration;
