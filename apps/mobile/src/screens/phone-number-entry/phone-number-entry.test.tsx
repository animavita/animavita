import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { act, screen, userEvent, waitFor } from '@testing-library/react-native';
import { Text } from 'react-native';

import PhoneNumberEntryScreen from './phone-number-entry.screen';

import useProfile from '@/hooks/use-profile';
import useUserRegister from '@/hooks/use-user-register';
import { StackParamsList } from '@/navigation/main-navigator';
import { renderWithProviders } from '@/test/test-utils';

jest.mock('@/hooks/use-profile', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    firstName: 'John',
  })),
}));

const mockSaveRole = jest.fn().mockResolvedValue(undefined);

jest.mock('@/hooks/use-user-register', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    saveRole: mockSaveRole,
    isSavingRole: false,
    user: { id: 'user-id' },
  })),
}));

const mockRequestOtp = jest.fn().mockResolvedValue(undefined);
const mockVerifyOtp = jest.fn().mockResolvedValue('+5511999999999');
jest.mock('@/hooks/use-otp-verification', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    requestOtp: mockRequestOtp,
    verifyOtp: mockVerifyOtp,
    isLoading: false,
  })),
}));

jest.mock('@/navigation/hooks/use-next-onboarding-screen', () => ({
  __esModule: true,
  default: jest.fn(() => () => 'Home'),
}));

const makeOTPInputsFiller = (user: ReturnType<typeof userEvent.setup>) => {
  return async () => {
    const [first, second, third, fourth, fifth, sixth] = screen.getAllByLabelText(
      'OTP code position',
      { exact: false }
    );

    await user.type(first, '1');
    await user.type(second, '2');
    await user.type(third, '3');
    await user.type(fourth, '4');
    await user.type(fifth, '5');
    await user.type(sixth, '6');

    return { first, second, third, fourth, fifth, sixth };
  };
};

describe('PhoneNumberEntry Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useUserRegister as jest.Mock).mockImplementation(() => ({
      saveRole: mockSaveRole,
      isSavingRole: false,
      user: { id: 'user-id' },
    }));
  });

  const user = userEvent.setup();

  it('renders the title and subtitle', () => {
    renderWithProviders(<PhoneNumberEntryScreen />);
    expect(screen.getByText('Vamos verificar seu celular?')).toBeVisible();
    expect(screen.getByText('Precisamos verificar seu número de telefone')).toBeVisible();
  });

  describe.each(['adopter', 'owner'])('when the user is an %s', (role) => {
    beforeEach(() => {
      jest.mocked(useProfile).mockReturnValue({ role } as ReturnType<typeof useProfile>);
    });

    it(`renders the correct phone entry note for ${role}`, async () => {
      renderWithProviders(<PhoneNumberEntryScreen />);
      const text = ROLE_TO_NOTE[role];
      const note = screen.getByText(text, { exact: false });
      expect(note).toBeVisible();
    });
  });

  it('continue button is initially disabled', () => {
    renderWithProviders(<PhoneNumberEntryScreen />);
    const continueButton = screen.getByRole('button', { name: 'Enviar código' });
    expect(continueButton).toBeDisabled();
  });

  describe('when the user enters a valid phone number', () => {
    beforeEach(async () => {
      renderWithProviders(<PhoneNumberEntryScreen />);
      const phoneInput = screen.getByPlaceholderText('Número de celular');
      await user.type(phoneInput, '11999999999');
    });

    it('enables the continue button', async () => {
      const continueButton = screen.getByRole('button', { name: 'Enviar código' });
      expect(continueButton).toBeEnabled();
    });

    describe('and taps the continue button', () => {
      beforeEach(async () => {
        const continueButton = screen.getByRole('button', { name: 'Enviar código' });
        await user.press(continueButton);
      });

      it('`sendsOtp` is called with the entered phone number', () => {
        expect(mockRequestOtp).toHaveBeenCalledWith('+5511 99999 9999');
      });

      it('shows the OTP verification step', async () => {
        expect(await screen.findByText('Digite o código', {}, { timeout: 1100 })).toBeVisible();
        expect(screen.getByText('Enviamos um código SMS para +55 11 99999 9999')).toBeVisible();
      });
    });
  });

  describe('OTP entry interaction', () => {
    const fillAllOTPInputs = makeOTPInputsFiller(user);

    beforeEach(async () => {
      jest.useFakeTimers();

      renderWithProviders(<MainNavigator />);
      const phoneInput = screen.getByPlaceholderText('Número de celular');
      await user.type(phoneInput, '11999999999');
      const continueButton = screen.getByRole('button', { name: 'Enviar código' });
      await user.press(continueButton);

      await waitFor(() => {
        expect(screen.getByText('Digite o código')).toBeVisible();
      });
    });

    it('verify buttons is enabled and disabled correctly', async () => {
      const { sixth } = await fillAllOTPInputs();

      const verifyButton = screen.getByRole('button', { name: 'Verificar' });
      expect(verifyButton).toBeEnabled();

      await user.clear(sixth);
      expect(verifyButton).toBeDisabled();
    });

    describe('when the user taps the verify button', () => {
      beforeEach(async () => {
        await fillAllOTPInputs();
        const verifyButton = screen.getByRole('button', { name: 'Verificar' });
        await user.press(verifyButton);

        await waitFor(() => {
          expect(screen.getByText('Home screen')).toBeVisible();
        });
      });

      it('`verifyCode` is called with the entered code', () => {
        expect(mockVerifyOtp).toHaveBeenCalledWith('+5511 99999 9999', '123456');
      });

      it('navigates to the next onboarding screen', () => {
        expect(screen.getByText('Home screen')).toBeVisible();
      });
    });

    it('countdown is started and decreases correctly', async () => {
      expect(screen.getByText('Aguarde 60s para alterar número ou reenviar')).toBeVisible();
      act(() => jest.advanceTimersByTime(1000));
      expect(screen.getByText('Aguarde 59s para alterar número ou reenviar')).toBeVisible();
      act(() => jest.advanceTimersByTime(1000));
      expect(screen.getByText('Aguarde 58s para alterar número ou reenviar')).toBeVisible();
    });

    it('allows changing number or resending code when countdown is up', async () => {
      for (let i = 0; i < 60; i++) {
        act(() => jest.advanceTimersByTime(1000));
      }

      const resendButton = screen.getByRole('button', {
        name: 'Alterar número ou reenviar código',
      });
      expect(resendButton).toBeEnabled();
    });

    afterEach(() => {
      jest.clearAllTimers();
    });
  });
});

const ROLE_TO_NOTE: Record<string, string> = {
  adopter: 'Quando sua solicitação de adoção for aprovada',
  owner: 'Quando você aprovar uma adoção',
};

const Stack = createNativeStackNavigator<StackParamsList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="PhoneNumber">
      <Stack.Screen name="PhoneNumber" component={PhoneNumberEntryScreen} />
      <Stack.Screen name="Home">
        {() => {
          return <Text>Home screen</Text>;
        }}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
