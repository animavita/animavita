import { CredentialsType, SignInRequest, SignInResponse } from '@animavita/types';

import client from './http-client';

import {
  getUserCredentials,
  removeUserCredentials,
  saveUserCredentials,
} from '@/helpers/secure-store';

const REFRESH_TOKEN_URL = '/auth/refresh';

let refreshTokenPromise: Promise<CredentialsType> | null = null;

const setAuthorizationHeader = (token: string) => {
  return `Bearer ${token}`;
};

export const signInRequest = (user: SignInRequest) => {
  return client.post<SignInResponse>('/auth/signIn', user);
};

export const refreshTokens = (
  refreshToken: CredentialsType['refreshToken'],
  sessionId: CredentialsType['sessionId']
) => {
  return client.get<CredentialsType>(REFRESH_TOKEN_URL, {
    headers: {
      Authorization: setAuthorizationHeader(refreshToken),
      'session-id': sessionId,
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
    if (!refreshTokenPromise) {
      refreshTokenPromise = refreshTokens(tokens.refreshToken, tokens.sessionId)
        .then(async (renewedTokens) => {
          await saveUserCredentials(renewedTokens.data);
          persistUserToken(renewedTokens.data.accessToken);
          return renewedTokens.data;
        })
        .finally(() => {
          refreshTokenPromise = null;
        });
    }

    const renewedTokens = await refreshTokenPromise;

    originalRequest.headers['Authorization'] = setAuthorizationHeader(renewedTokens.accessToken);
    return client(originalRequest);
  } catch (refreshError) {
    await removeUserCredentials();
    return Promise.reject(refreshError);
  }
};

client.interceptors.response.use((value) => value, handleTokenRefreshError);
