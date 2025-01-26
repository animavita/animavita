import { act, renderHook } from '@testing-library/react-native';

// @ts-ignore
// ignoring because of RN platform-specific code
// otherwise test runner is gonna import the mobile version
import useAuthActions from './use-auth-actions.ts';

import * as SignIn from '@/services/sign-in';

describe('useAuthActions', () => {
  beforeEach(jest.clearAllMocks);

  describe('when calling the signIn method', () => {
    it('persists the user token', async () => {
      jest.spyOn(SignIn, 'persistUserToken');

      const { result } = renderHook(useAuthActions);

      await act(async () => {
        await result.current.authActions.signIn({
          accessToken: '345-zyx',
          refreshToken: 'abc-123',
          name: 'John Due',
        });
      });

      expect(SignIn.persistUserToken).toHaveBeenCalledTimes(1);
      expect(SignIn.persistUserToken).toHaveBeenCalledWith('345-zyx');
    });
  });
});
