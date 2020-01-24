import React from 'react';
import {TextProps} from 'react-native';
import styled, {css} from 'styled-components/native';
import {Themed} from 'react-navigation';
import {FlattenInterpolation} from 'styled-components';

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

type TypographyType = 'bold' | 'italic';
interface CustomizeProps {
  type?: TypographyType;
  color?: string;
  css?: FlattenInterpolation<any>;
}
const Customize = ({type, color, css: customCss}: CustomizeProps) => css`
  ${type &&
    type === 'bold' &&
    css`
      font-weight: bold;
    `}
  ${type &&
    type === 'italic' &&
    css`
      font-style: italic;
    `}
  ${color &&
    css`
      color: ${color};
    `}
  ${customCss}
`;

const LargeTitle = styled(Themed.Text)`
  font-size: ${({theme}) => theme.sizeLargeTitle};
  ${Customize}
`;
const Title1 = styled(Themed.Text)`
  font-size: ${({theme}) => theme.sizeTitle1};
  ${Customize}
`;
const Title2 = styled(Themed.Text)`
  font-size: ${({theme}) => theme.sizeTitle2};
  ${Customize}
`;
const Title3 = styled(Themed.Text)`
  font-size: ${({theme}) => theme.sizeTitle3};
  ${Customize}
`;
const Headline = styled(Themed.Text)`
  font-size: ${({theme}) => theme.sizeHeadline};
  ${Customize}
`;
const Body = styled(Themed.Text)`
  font-size: ${({theme}) => theme.sizeBody};
  ${Customize}
`;
const Callout = styled(Themed.Text)`
  font-size: ${({theme}) => theme.sizeCallout};
  ${Customize}
`;
const Subheadline = styled(Themed.Text)`
  font-size: ${({theme}) => theme.sizeSubheadline};
  ${Customize}
`;
const Footnote = styled(Themed.Text)`
  font-size: ${({theme}) => theme.sizeFootnote};
  ${Customize}
`;
const Caption1 = styled(Themed.Text)`
  font-size: ${({theme}) => theme.sizeCaption1};
  ${Customize}
`;
const Caption2 = styled(Themed.Text)`
  font-size: ${({theme}) => theme.sizeCaption2};
  ${Customize}
`;

type TypographyVariantType =
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

interface TypographyProps extends TextProps, CustomizeProps {
  variant: TypographyVariantType;
}

const defaultProps: TypographyProps = {
  variant: 'body',
};

const Typography: React.FC<TypographyProps> = ({variant, children, ...props} = defaultProps) => {
  switch (variant) {
    case LARGE_TITLE:
      return <LargeTitle {...props}>{children}</LargeTitle>;
    case TITLE_1:
      return <Title1 {...props}>{children}</Title1>;
    case TITLE_2:
      return <Title2 {...props}>{children}</Title2>;
    case TITLE_3:
      return <Title3 {...props}>{children}</Title3>;
    case HEADLINE:
      return <Headline {...props}>{children}</Headline>;
    case BODY:
      return <Body {...props}>{children}</Body>;
    case CALLOUT:
      return <Callout {...props}>{children}</Callout>;
    case SUBHEADLINE:
      return <Subheadline {...props}>{children}</Subheadline>;
    case FOOTNOTE:
      return <Footnote {...props}>{children}</Footnote>;
    case CAPTION_1:
      return <Caption1 {...props}>{children}</Caption1>;
    case CAPTION_2:
      return <Caption2 {...props}>{children}</Caption2>;
    default:
      return <Body {...props}>{children}</Body>;
  }
};

export default Typography;
