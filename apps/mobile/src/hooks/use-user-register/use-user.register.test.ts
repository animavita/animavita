import { useMutation } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react-native';

import useUserRegister from './use-user.register';
import { useAuth } from '../use-auth-provider';

const credentials = { accessToken: '123', refreshToken: 'abc', name: 'John' };

jest.mock('@tanstack/react-query', () => ({
  useMutation: jest.fn(() => ({
    error: undefined,
    isError: false,
    mutateAsync: jest.fn(() => ({ data: credentials })),
  })),
}));

jest.mock('../use-auth-provider', () => ({
  useAuth: jest.fn(() => ({
    signIn: jest.fn(),
  })),
}));

describe('useUserRegister', () => {
  it('calls signIn when registration succeeds', async () => {
    const mockedSignIn = jest.fn();
    // @ts-ignore
    jest.mocked(useAuth).mockReturnValueOnce({ signIn: mockedSignIn });

    const { result } = renderHook(useUserRegister);

    const user = { name: 'John', email: 'john@email.com', password: '123' };
    const coords = { latitude: 1, longitude: 2 };

    await result.current.registerUser(user, coords);

    expect(mockedSignIn).toHaveBeenCalledTimes(1);
    expect(mockedSignIn).toHaveBeenCalledWith(credentials);
  });

  describe('when mutation.isError is false', () => {
    it('returns error as null', () => {
      // @ts-ignore
      jest.mocked(useMutation).mockReturnValueOnce({ isError: false });

      const { result } = renderHook(useUserRegister);

      expect(result.current.error).toBeNull();
    });
  });
});
