import { act, renderHook } from '@testing-library/react-native';

import useUserRegister from './use-user.register';
import { useAuth } from '../use-auth-provider';

import { QueryClientWrapper } from '@/test/test-utils';

const credentials = { accessToken: '123', refreshToken: 'abc', name: 'John' };

jest.mock('../use-auth-provider', () => ({
  useAuth: jest.fn(() => ({
    signIn: jest.fn(),
  })),
}));

jest.mock('@/navigation/use-navigation', () => ({
  useNavigation: jest.fn(() => ({
    navigate: jest.fn(),
  })),
}));

describe('useUserRegister', () => {
  it('calls signIn when registration succeeds', async () => {
    const mockedSignIn = jest.fn();
    // @ts-ignore
    jest.mocked(useAuth).mockReturnValueOnce({ signIn: mockedSignIn });

    const { result } = renderHook(useUserRegister, { wrapper: QueryClientWrapper });

    const user = { name: 'John', email: 'john@email.com', password: '123' };

    await act(async () => {
      await result.current.registerUser(user);
    });

    expect(mockedSignIn).toHaveBeenCalledTimes(1);
    expect(mockedSignIn).toHaveBeenCalledWith(credentials);
  });
});
