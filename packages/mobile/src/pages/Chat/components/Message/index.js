import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { styles } from './styles';
import { Title } from '~/components';

const colors = {
  me: ['#0AC4BA', '#2BDA8E'],
  from: ['#323643', '#323643']
};

const cardinals = {
  start: {
    x: 1,
    y: 0
  },
  end: {
    x: 0.2,
    y: 0
  }
};

const Message = ({ currentMessage }) => {
  const { user, text } = currentMessage;
  const auth = useSelector(state => state.auth);

  return (
    <LinearGradient
      colors={user._id !== auth._id ? colors.from : colors.me}
      start={cardinals.start}
      end={cardinals.from}
      style={user._id !== auth._id ? styles.from : styles.me}
    >
      <Title color="white" size={12} weight="normal">
        {text}
      </Title>
    </LinearGradient>
  );
};

Message.propTypes = {
  currentMessage: PropTypes.shape({}).isRequired
};

export default Message;
