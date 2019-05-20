import React, { Component } from 'react';

import {
  View, ScrollView, TextInput, Switch,
} from 'react-native';

import { Avatar, Divider } from 'react-native-elements';
import {
  Container, Profile, Header, Form, Input, Field, Small, styles,
} from './styles';

import Slider from 'react-native-slider';
import { H1 } from '~/components';
import { THEME_COLORS } from '~/utils/constants';

class Settings extends Component {
  state = {};

  render() {
    return (
      <Container>
        <Header>
          <H1>Perfil</H1>
          <Profile>
            <Avatar
              rounded
              size={16 * 2.2}
              source={{
                uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
              }}
            />
          </Profile>
        </Header>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Form>
            <Input>
              <View style={{ flex: 1 }}>
                <Field>Nome</Field>
                <TextInput
                  defaultValue="Wendel"
                  style={styles.input}
                  onChangeText={text => console.log(text)}
                />
              </View>
              <Small>Editar</Small>
            </Input>
            <Input>
              <View style={{ flex: 1 }}>
                <Field>Sobrenome</Field>
                <TextInput
                  defaultValue="Freitas"
                  style={styles.input}
                  onChangeText={text => console.log(text)}
                />
              </View>
              <Small>Editar</Small>
            </Input>
            <Input>
              <View style={{ flex: 1 }}>
                <Field>E-mail</Field>
                <TextInput
                  editable={false}
                  defaultValue="wendelfb@gmail.com"
                  style={styles.input}
                  onChangeText={text => console.log(text)}
                />
              </View>
            </Input>
          </Form>
          <Divider style={styles.divider} />
          <Form>
            <Input>
              <View style={{ flex: 1 }}>
                <Field>Distância máxima para receber alertas</Field>
                <Slider
                  minimumValue={0}
                  maximumValue={1000}
                  style={{ height: 19 }}
                  thumbStyle={styles.thumb}
                  trackStyle={{ height: 6, borderRadius: 6 }}
                  minimumTrackTintColor={THEME_COLORS.SECONDARY}
                  maximumTrackTintColor="rgba(157, 163, 180, 0.10)"
                  value={500}
                  onValueChange={value => console.log(value)}
                />
                <Small>15 km</Small>
              </View>
            </Input>
          </Form>
          <Divider style={styles.divider} />
          <Form>
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
                  true: '#2BDA8E',
                }}
                onValueChange={value => console.log(value)}
              />
            </Input>
          </Form>
        </ScrollView>
      </Container>
    );
  }
}

export default Settings;
