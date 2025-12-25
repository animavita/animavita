import { handleTokenRefreshError, persistUserToken } from './sign-in';

import * as SecureStoreHelpers from '@/helpers/secure-store';
import client from '@/services/http-client';

jest.mock('@/services/http-client', () => {
  const mockClient = jest.fn();
  return {
    __esModule: true,
    default: Object.assign(mockClient, {
      get: jest.fn(),
      post: jest.fn(),
      defaults: { headers: { common: {} } },
      interceptors: {
        response: {
          use: jest.fn(),
        },
      },
    }),
  };
});

describe('sign-in service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('handleTokenRefreshError', () => {
    it('rejects with error when status is not 401', async () => {
      jest.spyOn(SecureStoreHelpers, 'getUserCredentials');

      const error = {
        response: { status: 500 },
        config: { url: '/some-endpoint' },
      };

      await expect(handleTokenRefreshError(error)).rejects.toEqual(error);

      expect(SecureStoreHelpers.getUserCredentials).not.toHaveBeenCalled();
    });

    it('rejects with error when request is to refresh token endpoint', async () => {
      jest.spyOn(SecureStoreHelpers, 'getUserCredentials');

      const error = {
        response: { status: 401 },
        config: { url: '/auth/refresh' },
      };

      await expect(handleTokenRefreshError(error)).rejects.toEqual(error);

      expect(SecureStoreHelpers.getUserCredentials).not.toHaveBeenCalled();
    });

    it('rejects with error when no credentials are stored', async () => {
      jest.spyOn(SecureStoreHelpers, 'getUserCredentials').mockResolvedValueOnce(null);

      const mockClient = client as jest.MockedFunction<any>;

      const error = {
        response: { status: 401 },
        config: { url: '/some-endpoint', headers: {} },
      };

      await expect(handleTokenRefreshError(error)).rejects.toEqual(error);

      expect(mockClient.get).not.toHaveBeenCalled();
    });

    it('refreshes tokens and retries request on 401', async () => {
      const mockCredentials = {
        accessToken: 'old-access-token',
        refreshToken: 'valid-refresh-token',
        sessionId: 'session-123',
      };

      const mockNewCredentials = {
        accessToken: 'new-access-token',
        refreshToken: 'new-refresh-token',
        sessionId: 'session-123',
      };

      jest.spyOn(SecureStoreHelpers, 'getUserCredentials').mockResolvedValueOnce(mockCredentials);
      jest.spyOn(SecureStoreHelpers, 'saveUserCredentials').mockResolvedValueOnce(undefined);

      const mockClient = client as jest.MockedFunction<any>;
      (mockClient.get as jest.Mock).mockResolvedValueOnce({ data: mockNewCredentials });
      mockClient.mockResolvedValueOnce({ data: 'success' });

      const originalRequest = {
        url: '/some-endpoint',
        headers: {} as Record<string, string>,
      };

      const error = {
        response: { status: 401 },
        config: originalRequest,
      };

      const result = await handleTokenRefreshError(error);

      expect(mockClient.get).toHaveBeenCalledWith('/auth/refresh', {
        headers: {
          Authorization: 'Bearer valid-refresh-token',
          'session-Id': 'session-123',
        },
      });
      expect(SecureStoreHelpers.saveUserCredentials).toHaveBeenCalledWith(mockNewCredentials);
      expect(mockClient.defaults.headers.common['Authorization']).toBe('Bearer new-access-token');
      expect(originalRequest.headers['Authorization']).toBe('Bearer new-access-token');
      expect(mockClient).toHaveBeenCalledWith(originalRequest);
      expect(result).toEqual({ data: 'success' });
    });

    it('removes credentials when token refresh fails', async () => {
      const mockCredentials = {
        accessToken: 'old-access-token',
        refreshToken: 'expired-refresh-token',
        sessionId: 'session-123',
      };

      jest.spyOn(SecureStoreHelpers, 'getUserCredentials').mockResolvedValueOnce(mockCredentials);
      jest.spyOn(SecureStoreHelpers, 'removeUserCredentials').mockResolvedValueOnce(undefined);

      const mockClient = client as jest.MockedFunction<any>;
      const refreshError = new Error('Refresh token expired');
      (mockClient.get as jest.Mock).mockRejectedValueOnce(refreshError);

      const error = {
        response: { status: 401 },
        config: { url: '/some-endpoint', headers: {} },
      };

      await expect(handleTokenRefreshError(error)).rejects.toEqual(refreshError);

      expect(mockClient.get).toHaveBeenCalledWith('/auth/refresh', {
        headers: {
          Authorization: 'Bearer expired-refresh-token',
          'session-Id': 'session-123',
        },
      });
      expect(SecureStoreHelpers.removeUserCredentials).toHaveBeenCalledTimes(1);
    });
  });

  describe('persistUserToken', () => {
    it('sets authorization header on http client', () => {
      const mockClient = client as jest.Mocked<typeof client>;

      persistUserToken('test-token');

      expect(mockClient.defaults.headers.common['Authorization']).toBe('Bearer test-token');
    });
  });
});
