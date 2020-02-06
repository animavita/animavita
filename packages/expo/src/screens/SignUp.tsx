import React, {useEffect, useState} from 'react';
import {Platform, TouchableWithoutFeedback} from 'react-native';
import styled, {css} from 'styled-components/native';
import * as Facebook from 'expo-facebook';

import {heightPercentageToDP, widthPercentageToDP} from '@animavita/theme';
import {Background, Space} from '@animavita/ui/layout';
import {Typography} from '@animavita/ui/core';
import Images from '@animavita/ui/assets/images';
import {AppleButton, FacebookButton, GoogleButton} from '@animavita/ui/social';

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
  const [fbLoginIsLoading, changeFbLoginLoadingTo] = useState(false);

  useEffect(() => {
    async function inicializeFacebookSDK() {
      try {
        await Facebook.initializeAsync('877731272663210', 'Animavita');
      } catch ({message}) {
        console.log(`Facebook Login Error: ${message}`);
      }
    }

    Platform.OS !== 'web' && inicializeFacebookSDK();
  }, []);

  // TODO: make this work on the web
  const handleFacebookLogin =
    Platform.OS !== 'web'
      ? async () => {
          changeFbLoginLoadingTo(true);

          const response = await Facebook.logInWithReadPermissionsAsync({
            permissions: ['public_profile', 'email'],
          });

          console.log(response);

          changeFbLoginLoadingTo(false);
        }
      : () => null;

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
        <FacebookButton testID="fb-btn" onPress={handleFacebookLogin} />
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
    </Background>
  );
};

export default SignUp;
