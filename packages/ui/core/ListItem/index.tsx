import React from 'react';
import {TouchableOpacityProps} from 'react-native';
import styled, {css} from 'styled-components/native';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import {useTheme, px2ddp} from '@animavita/theme';
import {LinearGradient} from 'expo-linear-gradient';

import Avatar, {AvatarProps} from '../Avatar';
import {Space} from '../../layout';

const BorderRadiusStyle = css`
  border-radius: ${px2ddp(3)}px;
`;

const StyledLinearGradient = styled(LinearGradient)<{
  gradient?: boolean;
}>`
  ${BorderRadiusStyle}
`;

const LightStyle = css`
  border-bottom-width: ${px2ddp(0.2)}px;
  border-color: ${({theme}) => theme.greyLight};
`;

const Touchable = styled.TouchableOpacity<{
  gradient?: boolean;
}>`
  flex-direction: row;
  align-items: center;
  padding: ${px2ddp(5)}px;
  ${BorderRadiusStyle}
  ${({gradient}) => {
    if (gradient) return;
    return LightStyle;
  }}
`;

const gradientConfig = {
  start: {
    x: 0,
    y: 0,
  },
  end: {
    x: 1,
    y: 1,
  },
  locations: [0.1, 0.9],
};

interface ListItemProps extends TouchableOpacityProps {
  avatar?: AvatarProps;
  chevron?: boolean;
  gradient?: boolean;
}

type ListItemComponentType = React.FC<ListItemProps>;

const ListItem: ListItemComponentType = ({avatar, chevron, gradient, children, ...props}) => {
  const theme = useTheme();
  const {locations, start, end} = gradientConfig;

  const renderAvatar = () =>
    avatar && (
      <>
        <Avatar {...avatar} />
        <Space width={10} />
      </>
    );
  const renderChevron = () =>
    chevron && (
      <>
        <FontAwesomeIcons
          name="chevron-right"
          style={{marginLeft: 'auto'}}
          color={gradient ? theme.styledTheme.greyLight : theme.styledTheme.black}
        />
        <Space width={10} />
      </>
    );
  const renderChildren = () => children && children;

  return gradient ? (
    <StyledLinearGradient
      locations={locations}
      start={start}
      end={end}
      colors={[theme.styledTheme.greenDark, theme.styledTheme.greenLight]}
      gradient={gradient}>
      <Touchable gradient={gradient} {...props}>
        {renderAvatar()}
        {renderChildren()}
        {renderChevron()}
      </Touchable>
    </StyledLinearGradient>
  ) : (
    <Touchable gradient={gradient} {...props}>
      {renderAvatar()}
      {renderChildren()}
      {renderChevron()}
    </Touchable>
  );
};

export default ListItem;
