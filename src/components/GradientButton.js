import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { THEME_COLORS } from '~/utils/constants';

const start = {
  x: 0,
  y: 0,
};

const end = {
  x: 1,
  y: 1,
};

const locations = [0.1, 0.9];
const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    height: 16 * 3,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const GradientButton = ({ children, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8} opacity={0.8}>
    <LinearGradient
      start={start}
      end={end}
      locations={locations}
      style={styles.button}
      colors={[THEME_COLORS.PRIMARY, THEME_COLORS.SECONDARY]}
    >
      {children}
    </LinearGradient>
  </TouchableOpacity>
);

export default GradientButton;
