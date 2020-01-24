import React from 'react';
import {ViewProps} from 'react-native';
import {Themed} from 'react-navigation';
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
      <Themed.StatusBar />
      <ThemedBackground themeName={themeName} css={css} {...viewProps}>
        {children}
      </ThemedBackground>
    </>
  );
};

export default Background;
