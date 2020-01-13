import React from 'react';
import {Text, TextProps} from 'react-native';
import styled from 'styled-components/native';
import {heightPercentageToDP} from '@animavita/theme';

const LARGE_TITLE = 'large-title';
const TITLE_1 = 'title-1';
const TITLE_2 = 'title-2';
const TITLE_3 = 'title-3';
const HEADLINE = 'headline';
const BODY = 'body';
const CALLOUT = 'callout';
const SUBHEADLINE = 'subheadline';
const FOOTNOTE = 'footnote';
const CAPTION_1 = 'caption-1';
const CAPTION_2 = 'caption-2';

const LargeTitle = styled.Text`
  font-size: ${({theme}) => heightPercentageToDP(theme.sizeLargeTitle)}px;
`;
const Title1 = styled.Text`
  font-size: ${({theme}) => heightPercentageToDP(theme.sizeTitle1)}px;
`;
const Title2 = styled.Text`
  font-size: ${({theme}) => heightPercentageToDP(theme.sizeTitle2)}px;
`;
const Title3 = styled.Text`
  font-size: ${({theme}) => heightPercentageToDP(theme.sizeTitle3)}px;
`;

type TypographyType =
  | typeof LARGE_TITLE
  | typeof TITLE_1
  | typeof TITLE_2
  | typeof TITLE_3
  | typeof HEADLINE
  | typeof BODY
  | typeof CALLOUT
  | typeof SUBHEADLINE
  | typeof FOOTNOTE
  | typeof CAPTION_1
  | typeof CAPTION_2;

interface TypographyProps extends TextProps {
  variant: TypographyType;
}

const Typography: React.FC<TypographyProps> = ({variant, children, ...props}) => {
  switch (variant) {
    case LARGE_TITLE:
      return <LargeTitle {...props}>{children}</LargeTitle>;
    case TITLE_1:
      return <Title1 {...props}>{children}</Title1>;
    case TITLE_2:
      return <Title2 {...props}>{children}</Title2>;
    case TITLE_3:
      return <Title3 {...props}>{children}</Title3>;
    default:
      return <Text {...props}>{children}</Text>;
  }
};

export default Typography;
