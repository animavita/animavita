import React from 'react';
import {View, StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';

import {Overlay, Name, NopeLabel, LikeLabel, Image, Headers, Footer} from './styles';

const {Value} = Animated;

interface Profile {
  id: string;
  name: string;
  age: number;
  profile: object;
}

interface CardProps {
  profile?: Profile;
  likeOpacity?: Value | number;
  nopeOpacity?: Value | number;
}

const defaultProps: CardProps = {
  likeOpacity: 0,
  nopeOpacity: 0,
};

const Card: React.FC<CardProps> = ({profile, likeOpacity, nopeOpacity}) => {
  return (
    <View style={StyleSheet.absoluteFill}>
      <Image style={{...StyleSheet.absoluteFillObject}} source={profile.profile} />
      <Overlay>
        <Headers>
          <Animated.View style={[styles.like, {opacity: likeOpacity}]}>
            <LikeLabel>LIKE</LikeLabel>
          </Animated.View>
          <Animated.View style={[styles.nope, {opacity: nopeOpacity}]}>
            <NopeLabel>NOPE</NopeLabel>
          </Animated.View>
        </Headers>
        <Footer>
          <Name>{profile.name}</Name>
        </Footer>
      </Overlay>
    </View>
  );
};

Card.defaultProps = defaultProps;

export default Card;

const styles = StyleSheet.create({
  like: {
    borderWidth: 4,
    borderRadius: 5,
    padding: 8,
    borderColor: '#6ee3b4',
  },
  nope: {
    borderWidth: 4,
    borderRadius: 5,
    padding: 8,
    borderColor: '#ec5288',
  },
});
