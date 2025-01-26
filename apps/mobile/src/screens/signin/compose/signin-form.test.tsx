import { http, HttpResponse } from 'msw';

import { SignInForm } from './signin-form';

import { server } from '@/test/msw/server';
import { fireEvent, renderWithProviders, screen, act, waitFor } from '@/test/test-utils';

const mockShow = jest.fn();
jest.mock('native-base', () => ({
  ...jest.requireActual('native-base'),
  useToast: () => ({
    show: mockShow,
    isActive: () => false,
  }),
}));

const mockSignIn = jest.fn();
jest.mock('@/hooks/use-auth-provider', () => ({
  useAuth: jest.fn(() => ({
    signIn: mockSignIn,
  })),
}));

describe('SignIn Form', () => {
  describe('when the sign in succeeds', () => {
    it('logs the user in', async () => {
      renderWithProviders(<SignInForm />);

      const emailField = screen.getByPlaceholderText(/email/i);
      const passwordField = screen.getByPlaceholderText(/senha/i);
      const submitButton = screen.getByRole('button', { name: /entrar/i });

      fireEvent.changeText(emailField, 'john@email.com');
      fireEvent.changeText(passwordField, '12345678');

      await act(async () => {
        fireEvent.press(submitButton);
      });

      expect(mockSignIn).toHaveBeenCalledTimes(1);
      expect(mockSignIn).toHaveBeenCalledWith({
        accessToken: '123',
        refreshToken: 'abc',
        name: 'John Due',
      });
    });
  });

  describe('when the sign in fails', () => {
    it('displays an error', async () => {
      server.use(
        http.post('*/api/v1/auth/signIn', () => {
          return HttpResponse.json(
            {
              message: 'Wrong email or password',
            },
            { status: 400 }
          );
        })
      );

      renderWithProviders(<SignInForm />);

      const emailField = screen.getByPlaceholderText(/email/i);
      const passwordField = screen.getByPlaceholderText(/senha/i);
      const submitButton = screen.getByRole('button', { name: /entrar/i });

      fireEvent.changeText(emailField, 'john@email.com');
      fireEvent.changeText(passwordField, '12345678');

      await act(async () => {
        fireEvent.press(submitButton);
      });

      await waitFor(() =>
        expect(mockShow).toHaveBeenNthCalledWith(1, {
          title: 'Wrong email or password',
          variant: 'solid',
        })
      );
    });
  });
});
