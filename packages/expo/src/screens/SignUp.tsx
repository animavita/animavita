import React from 'react';
import {Platform} from 'react-native';
import styled, {css} from 'styled-components/native';

import {heightPercentageToDP, widthPercentageToDP} from '@animavita/theme';
import {Background} from '@animavita/ui/layout';
import {Button, Space, Typography} from '@animavita/ui/core';
import Images from '@animavita/ui/assets/images';

const Wrapper = styled.View`
  ${() =>
    Platform.OS === 'web'
      ? css`
          min-width: 30%;
        `
      : css`
          width: 100%;
          padding: 0 ${widthPercentageToDP('10%')}px;
        `}
`;

const bgStyle = css`
  justify-content: flex-start;
  align-items: center;
`;
const titleStyle = css`
  color: ${({theme}) => theme.greenLight};
`;

const SignUp: React.FC = () => {
  return (
    <Background css={bgStyle}>
      <Wrapper>
        <Space height={heightPercentageToDP('7%')} />
        <Images.BlackPersonWithDog />
        <Space height={heightPercentageToDP('4%')} />
        <Typography variant="title-3" type="bold" css={titleStyle}>
          Animavita
        </Typography>
        <Typography variant="title-3" type="bold">
          Salve uma vida
        </Typography>
        <Space height={heightPercentageToDP('4%')} />
        <Button size="small" text="Facebook" type="outline" />
        <Space height={heightPercentageToDP('1%')} />
        <Button size="small" text="Google" type="outline" />
        <Space height={heightPercentageToDP('1%')} />
        <Button size="small" text="Apple" type="outline" />
      </Wrapper>
    </Background>
  );
};

export default SignUp;
