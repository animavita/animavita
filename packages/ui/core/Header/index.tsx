import React from 'react';
import styled from 'styled-components/native';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import {px2ddp, heightPercentageToDP, useTheme} from '@animavita/theme';

import Typography from '../Typography';

const Wrapper = styled.View`
  margin: ${heightPercentageToDP('5%')}px 0 0 ${px2ddp(10)}px;
  flex-direction: row;
  width: 100%;
`;

const BackButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
  hitSlop: {top: 10, bottom: 10, left: 10, right: 10},
})`
  margin-right: ${px2ddp(10)}px;
  align-items: flex-start;
  justify-content: center;
`;

interface HeaderProps {
  title: string;
  onPrevious?: () => void;
}

const Header: React.FC<HeaderProps> = ({title, onPrevious}) => {
  const {theme} = useTheme();

  return (
    <Wrapper>
      {onPrevious && (
        <BackButton testID="backButton" onPress={onPrevious}>
          <FontAwesomeIcons name="chevron-left" size={18} color={theme.colors.text} />
        </BackButton>
      )}
      <Typography variant="title-3" type="bold">
        {title}
      </Typography>
    </Wrapper>
  );
};

export default Header;
