import React from "react";
import { Image, View, Text } from "react-native";
import Swiper from "react-native-swiper";
import {
  styles,
  Container,
  Background,
  Footer,
  Title,
  About,
  Slide,
  Description
} from "./styles";
import { Button } from "react-native-elements";

const slides = [
  {
    title: "Dogs!",
    description: `displays a centered icon (when no title) or to the left (with text). (can be used along with iconRight as well). Can be an object or a custom component.`,
    icon: require("../../images/bone.png")
  },
  {
    title: "Hello Gentleman",
    description: `displays a centered icon (when no title) or to the left (with text). (can be used along with iconRight as well). Can be an object or a custom component.`,
    icon: require("../../images/respect.png")
  },
  {
    title: "Winner!",
    description: `displays a centered icon (when no title) or to the left (with text). (can be used along with iconRight as well). Can be an object or a custom component.`,
    icon: require("../../images/siren.png")
  }
];

handleLoginWithFacebook = () => {
  alert("Login");
};
const Login = props => (
  <Container>
    <Background>
      <View style={styles.header}>
        <Swiper
          activeDotColor="white"
          autoplay
          autoplayTimeout={4}
          dotStyle={styles.dot}
          activeDotStyle={styles.dot}
        >
          {slides.map((slide, index) => (
            <Slide key={index}>
              <Image style={styles.icon} source={slide.icon} />
              <Title>{slide.title}</Title>
              <Description>{slide.description}</Description>
            </Slide>
          ))}
        </Swiper>
      </View>
    </Background>
    <Footer>
      <Button
        title="ENTRAR COM FACEBOOK"
        buttonStyle={styles.button}
        titleStyle={styles.title}
        onPress={() => props.navigation.navigate("Introduction")}
      />
      <About>
        <Text style={styles.about}>Quer saber mais sobre Animavita?</Text>
        <Text style={styles.click}>Clique aqui!</Text>
      </About>
    </Footer>
  </Container>
);

Login.navigationOptions = {
  header: null
};

export default Login;
