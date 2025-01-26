import { act, renderHook } from '@testing-library/react-native';

import useAuthActions from './use-auth-actions.native';

import * as SecureStoreHelpers from '@/helpers/secure-store';
import * as SignIn from '@/services/sign-in';

describe('useAuthActions', () => {
  beforeEach(jest.clearAllMocks);

  it('persists the user token', async () => {
    jest.spyOn(SecureStoreHelpers, 'getUser').mockResolvedValueOnce({
      accessToken: '189-xyz',
      refreshToken: 'abc-123',
      name: 'John Due',
    });

    jest.spyOn(SignIn, 'persistUserToken');

    const { result } = renderHook(useAuthActions);

    await act(async () => expect(result.current.state).toBeDefined());

    expect(SignIn.persistUserToken).toHaveBeenCalledTimes(1);
    expect(SignIn.persistUserToken).toHaveBeenCalledWith('189-xyz');
  });

  describe('when calling the signIn method', () => {
    it('persists the user token', async () => {
      jest.spyOn(SignIn, 'persistUserToken');
      jest.spyOn(SecureStoreHelpers, 'getUser');

      const { result } = renderHook(useAuthActions);

      await act(async () => {
        await result.current.authActions.signIn({
          accessToken: '123-abc',
          refreshToken: 'abc-123',
          name: 'John Due',
        });
      });

      expect(SignIn.persistUserToken).toHaveBeenCalledTimes(1);
      expect(SignIn.persistUserToken).toHaveBeenCalledWith('123-abc');
    });
  });
});
