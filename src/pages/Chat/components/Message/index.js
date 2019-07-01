import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import { styles } from './styles';

const colors = {
  me: ['#0AC4BA', '#2BDA8E'],
  from: ['#323643', '#323643'],
};

const cardinals = {
  start: {
    x: 1,
    y: 0,
  },
  end: {
    x: 0.2,
    y: 0,
  },
};

const me = 'Wendel Freitas';
const Message = ({ from, children }) => (
  <LinearGradient
    colors={from === me ? colors.me : colors.from}
    start={cardinals.start}
    end={cardinals.from}
    style={from === me ? styles.me : styles.from}
  >
    {children}
  </LinearGradient>
);

Message.propTypes = {
  from: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
export default Message;
