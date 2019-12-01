import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { THEME_COLORS } from '~/utils/constants';
import PropTypes from 'prop-types';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Loading from './Loading';

const cardinals = {
  start: {
    x: 0,
    y: 0,
  },
  end: {
    x: 1,
    y: 1,
  },
};

const locations = [0.1, 0.9];
const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    minHeight: hp('5.2%'),
    padding: 5,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  opacity: {
    opacity: 0.7,
    borderRadius: 6,
    minHeight: hp('5.2%'),
    padding: 5,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const GradientButton = ({
  children, onPress, loading, disabled,
}) => (
  <TouchableOpacity
    style={styles.button}
    onPress={disabled ? null : onPress}
    activeOpacity={disabled ? 1 : 0.8}
    opacity={0.8}
  >
    <LinearGradient
      start={cardinals.start}
      end={cardinals.end}
      locations={locations}
      style={disabled ? styles.opacity : styles.button}
      colors={[THEME_COLORS.PRIMARY, THEME_COLORS.SECONDARY]}
    >
      {loading ? <Loading size={27} color="white" /> : children}
    </LinearGradient>
  </TouchableOpacity>
);

GradientButton.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
};

GradientButton.defaultProps = {
  loading: false,
  disabled: true,
};

export default GradientButton;
