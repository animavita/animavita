import { CredentialsType, SignInRequest, SignInResponse } from '@animavita/types';

import client from './http-client';

import {
  getUserCredentials,
  removeUserCredentials,
  saveUserCredentials,
} from '@/helpers/secure-store';

const REFRESH_TOKEN_URL = '/auth/refresh';

const setAuthorizationHeader = (token: string) => {
  return `Bearer ${token}`;
};

export const signInRequest = (user: SignInRequest) => {
  return client.post<SignInResponse>('/auth/signIn', user);
};

export const refreshTokens = (
  refreshToken: CredentialsType['accessToken'],
  sessionId: CredentialsType['sessionId']
) => {
  return client.get<CredentialsType>(REFRESH_TOKEN_URL, {
    headers: {
      Authorization: setAuthorizationHeader(refreshToken),
      'session-Id': sessionId,
    },
  });
};

export const logoutRequest = () => {
  return client.get('/auth/logout');
};

export const persistUserToken = (token: string) => {
  client.defaults.headers.common['Authorization'] = setAuthorizationHeader(token);
};

export const handleTokenRefreshError = async (error: any) => {
  const status = error.response?.status;
  const originalRequest = error.config;

  if (status !== 401) {
    return Promise.reject(error);
  }

  if (originalRequest?.url === REFRESH_TOKEN_URL) {
    return Promise.reject(error);
  }

  console.log('Access token expired, attempting to refresh tokens...');

  const tokens = await getUserCredentials();

  if (!tokens) {
    return Promise.reject(error);
  }

  try {
    const renewedTokens = await refreshTokens(tokens.refreshToken, tokens.sessionId);
    await saveUserCredentials(renewedTokens.data);
    persistUserToken(renewedTokens.data.accessToken);

    originalRequest.headers['Authorization'] = setAuthorizationHeader(
      renewedTokens.data.accessToken
    );
    return client(originalRequest);
  } catch (refreshError) {
    await removeUserCredentials();
    return Promise.reject(refreshError);
  }
};

client.interceptors.response.use((value) => value, handleTokenRefreshError);
