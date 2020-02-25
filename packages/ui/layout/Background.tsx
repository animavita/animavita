import React from 'react';
import {ViewProps, StatusBar} from 'react-native';
import styled from 'styled-components/native';
import {FlattenSimpleInterpolation} from 'styled-components';

import {PossibleThemes, useTheme} from '@animavita/theme';

const ThemedBackground = styled.SafeAreaView<BackgroundProps & {themeName: PossibleThemes}>`
  background-color: ${({themeName, theme}) => (themeName === 'light' ? theme.white : theme.black)};
  height: 100%;
  ${({css}) => css}
`;

interface BackgroundProps {
  css?: FlattenSimpleInterpolation;
}

const Background: React.FC<ViewProps & BackgroundProps> = ({children, css, ...viewProps}) => {
  const {themeName} = useTheme();

  return (
    <>
      <StatusBar barStyle={themeName === 'light' ? 'dark-content' : 'light-content'} />
      <ThemedBackground themeName={themeName} css={css} {...viewProps}>
        {children}
      </ThemedBackground>
    </>
  );
};

export default Background;
