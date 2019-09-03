import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import { styles } from './styles';
import { Title } from '~/components';

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
const Message = ({ currentMessage }) => {
  const { user } = currentMessage;
  return (
    <LinearGradient
      colors={user.name !== me ? colors.from : colors.me}
      start={cardinals.start}
      end={cardinals.from}
      style={user.name !== me ? styles.from : styles.me}
    >
      <Title color="white" size={12} weight="normal">
        {currentMessage.text}
      </Title>
    </LinearGradient>
  );
};

export default Message;
