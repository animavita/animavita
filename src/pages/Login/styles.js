import styled from "styled-components";

export const Container = styled.View`
  flex: 1;
  background-color: white;
`;

export const Footer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  color: white;
  font-size: 25;
  font-weight: bold;
  margin-bottom: 10;
`;

export const Description = styled.Text`
  font-size: 13;
  font-family: "Roboto";
  text-align: center;
  color: white;
  margin-bottom: 30;
`;

export const Background = styled.View`
  height: 80%;
  justify-content: center;
  align-items: center;
`;

export const Slide = styled.View`
  flex: 1;
  padding: 210px;
  text-align: center;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;

export const About = styled.View`
  width: 90%;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  margin-top: 25;
  margin-bottom: 10;
`;

export const styles = {
  header: {
    flex: 1,
    width: "200%",
    backgroundColor: "#44cd5b",

    borderBottomLeftRadius: 3900
  },

  button: {
    backgroundColor: "#44cd5b",
    borderRadius: 20,
    paddingHorizontal: 15
  },

  title: { fontSize: 12 },

  dot: {
    marginBottom: 25
  },

  about: {
    fontSize: 13,
    color: "black"
  },

  click: {
    fontSize: 13,
    color: "#44cd5b",
    marginLeft: 5
  },

  icon: {
    width: 90,
    height: 90,
    marginBottom: 45
  }
};
