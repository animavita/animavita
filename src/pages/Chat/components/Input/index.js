import React, { Component } from "react";

import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text
} from "react-native";
import { THEME_COLORS } from "~/utils/constants";

class Input extends Component {
  state = {
    message: ""
  };

  handleAddMessage = async () => {
    const { author } = this.props;
    const { message } = this.state;

  
    this.setState({ message: "" });
  };

  render() {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          value={this.state.message}
          onChangeText={message => this.setState({ message })}
          style={styles.input}
          underlineColorAndroid="rgba(0,0,0,0)"
        />
        <TouchableOpacity onPress={this.handleAddMessage}>
          <Text style={styles.button}>Enviar</Text>
        </TouchableOpacity>
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