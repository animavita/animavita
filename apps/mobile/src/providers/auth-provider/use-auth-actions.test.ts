import { act, renderHook } from '@testing-library/react-native';

import useAuthActions from './use-auth-actions';

import * as SecureStoreHelpers from '@/helpers/secure-store';
import * as SignIn from '@/services/sign-in';
import { QueryClientWrapper } from '@/test/test-utils';

describe('useAuthActions', () => {
  beforeEach(jest.clearAllMocks);

  it('persists the user token on initialization', async () => {
    jest.spyOn(SecureStoreHelpers, 'getUserCredentials').mockResolvedValueOnce({
      accessToken: '189-xyz',
      refreshToken: 'abc-123',
      sessionId: 'session-123',
    });

    jest.spyOn(SignIn, 'persistUserToken');

    const { result } = renderHook(useAuthActions, { wrapper: QueryClientWrapper });

    await act(async () => expect(result.current.state).toBeDefined());

    expect(SignIn.persistUserToken).toHaveBeenCalledTimes(1);
    expect(SignIn.persistUserToken).toHaveBeenCalledWith('189-xyz');
  });

  describe('when calling the signIn method', () => {
    it('persists the user token and saves credentials', async () => {
      jest.spyOn(SignIn, 'persistUserToken');
      jest.spyOn(SecureStoreHelpers, 'getUserCredentials');
      jest.spyOn(SecureStoreHelpers, 'saveUserCredentials').mockResolvedValueOnce(undefined);

      const { result } = renderHook(useAuthActions, { wrapper: QueryClientWrapper });

      const credentials = {
        accessToken: '123-abc',
        refreshToken: 'abc-123',
        sessionId: 'session-456',
        name: 'John Due',
      };

      await act(async () => {
        await result.current.authActions.signIn(credentials);
      });

      expect(SignIn.persistUserToken).toHaveBeenCalledTimes(1);
      expect(SignIn.persistUserToken).toHaveBeenCalledWith('123-abc');
      expect(SecureStoreHelpers.saveUserCredentials).toHaveBeenCalledTimes(1);
      expect(SecureStoreHelpers.saveUserCredentials).toHaveBeenCalledWith(credentials);
    });
  });

  describe('when calling the signOut method', () => {
    it('calls logout API and removes credentials', async () => {
      jest.spyOn(SecureStoreHelpers, 'getUserCredentials').mockResolvedValueOnce(null);
      jest.spyOn(SignIn, 'logoutRequest').mockResolvedValueOnce({} as any);
      jest.spyOn(SecureStoreHelpers, 'removeUserCredentials').mockResolvedValueOnce(undefined);

      const { result } = renderHook(useAuthActions, { wrapper: QueryClientWrapper });

      await act(async () => {
        await result.current.authActions.signOut();
      });

      expect(SignIn.logoutRequest).toHaveBeenCalledTimes(1);
      expect(SecureStoreHelpers.removeUserCredentials).toHaveBeenCalledTimes(1);
    });

    it('removes credentials even if logout API fails', async () => {
      jest.spyOn(SecureStoreHelpers, 'getUserCredentials').mockResolvedValueOnce(null);
      jest.spyOn(SignIn, 'logoutRequest').mockRejectedValueOnce(new Error('Network error'));
      jest.spyOn(SecureStoreHelpers, 'removeUserCredentials').mockResolvedValueOnce(undefined);
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

      const { result } = renderHook(useAuthActions, { wrapper: QueryClientWrapper });

      await act(async () => {
        await result.current.authActions.signOut();
      });

      expect(SignIn.logoutRequest).toHaveBeenCalledTimes(1);
      expect(consoleLogSpy).toHaveBeenCalledWith('Logout API call failed:', expect.any(Error));
      expect(SecureStoreHelpers.removeUserCredentials).toHaveBeenCalledTimes(1);

      consoleLogSpy.mockRestore();
    });
  });
});
