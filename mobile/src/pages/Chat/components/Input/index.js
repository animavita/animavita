import React, { Component } from "react";

import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text
} from "react-native";
import { THEME_COLORS } from "~/utils/constants";
import { Send } from 'react-native-gifted-chat';

class Input extends Component {
  state = {
    message: ''
  }

  render() {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          value={this.state.message}
          onChangeText={message => this.setState({ message })}
          style={styles.input}
          underlineColorAndroid="rgba(0,0,0,0)"
        />
          <Send {...this.props}>

            <Text style={styles.button}>Enviar</Text>
          </Send>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    height: 42,
    paddingHorizontal: 10,
    backgroundColor: "#fafafa",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#ccc",
    flexDirection: "row",
    alignItems: "center"
  },

  input: {
    flex: 1,
    height: 30,
    paddingHorizontal: 10,
    paddingVertical: 0,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12
  },

  button: {
    marginLeft: 10,
    color: THEME_COLORS.SECONDARY,
    fontWeight: "bold"
  }
});



export default Input