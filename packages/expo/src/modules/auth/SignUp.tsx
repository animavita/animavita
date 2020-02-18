import React from 'react';
import {Platform, TouchableWithoutFeedback} from 'react-native';
import styled, {css} from 'styled-components/native';

import {heightPercentageToDP, widthPercentageToDP} from '@animavita/theme';
import {Background, FillSpace, Space} from '@animavita/ui/layout';
import {Typography} from '@animavita/ui/core';
import Images from '@animavita/ui/assets/images';
import {AppleButton, GoogleButton} from '@animavita/ui/social';

import BottomBar from '../common/BottomBar';

import ContinueWithFacebook from './ContinueWithFacebook';

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
const termsStyle = css`
  color: ${({theme}) => theme.greyLight};
`;

const SignUp: React.FC = () => {
  return (
    <Background css={bgStyle}>
      <Wrapper testID="wrapper">
        <Space height={heightPercentageToDP('7%')} />
        <Images.BlackPersonWithDog testID="image" />
        <Space height={heightPercentageToDP('4%')} />
        <Typography variant="title-3" type="bold" css={titleStyle} testID="title">
          Animavita
        </Typography>
        <Typography variant="title-3" type="bold" testID="subtitle">
          Salve uma vida
        </Typography>
        <Space height={heightPercentageToDP('4%')} />
        <ContinueWithFacebook />
        <Space height={heightPercentageToDP('1%')} />
        <GoogleButton testID="google-btn" />
        {Platform.OS === 'ios' && (
          <>
            <Space height={heightPercentageToDP('1%')} />
            <AppleButton testID="apple-btn" />
          </>
        )}
        <Space height={heightPercentageToDP('5%')} />
        <TouchableWithoutFeedback>
          <Typography variant="body" css={termsStyle}>
            Termos de uso
          </Typography>
        </TouchableWithoutFeedback>
      </Wrapper>
      <FillSpace />
      <BottomBar />
    </Background>
  );
};

export default SignUp;
