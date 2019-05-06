import React, { Component } from 'react';

import {  Picker } from 'react-native';

import { Container } from './styles';

class NewAdopt extends Component {
  state = {
    language: 'java',
  };

  render() {
    return (
      <Container>
        <Picker
          mode="dialog"
          selectedValue={this.state.language}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}
        >
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
      </Container>
    );
  }
}

export default NewAdopt;
