import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screen, userEvent } from '@testing-library/react-native';
import { Text } from 'react-native';

import RoleSelectionScreen from './role-selection';

import useUserRegister from '@/hooks/use-user-register';
import { StackParamsList } from '@/navigation/main-navigator';
import { renderWithProviders } from '@/test/test-utils';

jest.mock('@/hooks/use-profile', () => ({
  __esModule: true,
  default: () => ({
    firstName: 'John',
  }),
}));

const mockSaveRole = jest.fn().mockResolvedValue(undefined);

jest.mock('@/hooks/use-user-register', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    saveRole: mockSaveRole,
    isSavingRole: false,
  })),
}));

const mockShow = jest.fn();
jest.mock('native-base', () => ({
  ...jest.requireActual('native-base'),
  useToast: () => ({
    show: mockShow,
    isActive: () => false,
  }),
}));

describe('RoleSelection Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useUserRegister as jest.Mock).mockImplementation(() => ({
      saveRole: mockSaveRole,
      isSavingRole: false,
    }));
  });

  const user = userEvent.setup();

  it('renders the title with the user first name', () => {
    renderWithProviders(<RoleSelectionScreen />);
    expect(screen.getByText('Como você deseja usar o Animavita, John?')).toBeVisible();
  });

  it('continue button is initially disabled', () => {
    renderWithProviders(<RoleSelectionScreen />);
    const continueButton = screen.getByRole('button', { name: 'Continuar' });
    expect(continueButton).toBeDisabled();
  });

  describe.each(['adopter', 'owner'])('when the user wants to be %s', (role) => {
    it(`highlights the ${role} button`, async () => {
      renderWithProviders(<RoleSelectionScreen />);
      const roleButtonText = ROLE_TO_BUTTON_TEXT[role];
      const roleButton = screen.getByRole('button', { name: roleButtonText });

      await user.press(roleButton);

      expect(roleButton).toBeSelected();
    });

    it('enables the continue button', async () => {
      renderWithProviders(<RoleSelectionScreen />);
      const roleButton = screen.getByRole('button', { name: ROLE_TO_BUTTON_TEXT[role] });
      const continueButton = screen.getByRole('button', { name: 'Continuar' });

      await user.press(roleButton);

      expect(continueButton).toBeEnabled();
    });
  });

  describe('when the continue button is pressed', () => {
    const pressContinueButton = async () => {
      const roleButton = screen.getByRole('button', { name: ROLE_TO_BUTTON_TEXT['adopter'] });
      await user.press(roleButton);
      const continueButton = screen.getByRole('button', { name: 'Continuar' });
      await user.press(continueButton);

      return { continueButton };
    };

    it('`saveRole` is called with the selected role', async () => {
      renderWithProviders(<MainNavigator />);
      await pressContinueButton();

      expect(mockSaveRole).toHaveBeenCalledTimes(1);
      expect(mockSaveRole).toHaveBeenCalledWith('adopter');
    });

    it('continue button is disabled while saving the role', async () => {
      (useUserRegister as jest.Mock).mockImplementation(() => ({
        saveRole: jest.fn(),
        isSavingRole: true,
      }));

      renderWithProviders(<MainNavigator />);
      const { continueButton } = await pressContinueButton();

      expect(continueButton).toBeDisabled();
    });

    describe('and saving the role succeeds', () => {
      it('navigates to the GeoLocation screen', async () => {
        renderWithProviders(<MainNavigator />);
        await pressContinueButton();

        expect(screen.getByText('Geolocation screen')).toBeVisible();
      });
    });

    describe('and saving the role fails', () => {
      beforeEach(() => {
        mockSaveRole.mockRejectedValueOnce(new Error('Network error'));
      });

      it('shows a generic error toast', async () => {
        renderWithProviders(<RoleSelectionScreen />);
        await pressContinueButton();

        expect(mockShow).toHaveBeenCalledWith(
          expect.objectContaining({
            description: 'Ocorreu um erro. Tente novamente mais tarde.',
          })
        );
      });
    });
  });
});

const ROLE_TO_BUTTON_TEXT: Record<string, string> = {
  adopter: 'Quero encontrar um pet',
  owner: 'Quero por um pet para adoção',
};

const Stack = createNativeStackNavigator<StackParamsList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="RoleSelection">
      <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
      <Stack.Screen name="GeoLocation">
        {() => {
          return <Text>Geolocation screen</Text>;
        }}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
