import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { act } from '@testing-library/react-native';
import { Text } from 'react-native';

import PetForm from './pet-form.component';
import { AdoptionSteps } from './pet-form.types';

import { StackParamsList } from '@/navigation/main-navigator';
import { fireEvent, renderWithProviders, screen, waitFor } from '@/test/test-utils';

const mockShow = jest.fn();
jest.mock('native-base', () => ({
  ...jest.requireActual('native-base'),
  useToast: () => ({
    show: mockShow,
    isActive: () => false,
  }),
}));

const forwardStep = () => {
  fireEvent.press(screen.getByText(/pr[oó]xima etapa/gi));
};

const fillOutTextInput = async (testId: string, value: string) => {
  const input = await screen.findByTestId(`adoption-form-${testId}-input`);
  fireEvent.changeText(input, value);
};

const pickOptionFromList = async (optionText: string | RegExp) => {
  const option = await screen.findByText(optionText);
  fireEvent.press(option);
};

const goToLastStep = async () => {
  await fillOutTextInput('name', 'Bob');
  forwardStep();
  await fillOutTextInput('breed', 'pitbull');
  forwardStep();
  await pickOptionFromList(/c[aã]o/gi);
  forwardStep();
  await pickOptionFromList(/filhote \(menos de 1 ano\)/i);
  forwardStep();
  await pickOptionFromList(/macho/i);
  forwardStep();
  await pickOptionFromList(/grande/i);
  forwardStep();
  await screen.findByText(/fotos/i);
  forwardStep();
  await screen.findByText(/confirmar/i);
};

const Stack = createNativeStackNavigator<StackParamsList>();

const MainNavigator = ({ petForm }: { petForm?: () => React.ReactNode }) => {
  const defaultForm = () => <PetForm defaultValues={{ age: 'adult' }} title="Register Pet" />;

  return (
    <Stack.Navigator initialRouteName="RegisterPet">
      <Stack.Screen name="Home">
        {() => {
          return <Text>Welcome to Animavita!</Text>;
        }}
      </Stack.Screen>
      <Stack.Screen name="RegisterPet">{petForm || defaultForm}</Stack.Screen>
    </Stack.Navigator>
  );
};

const stepErrors: { step: AdoptionSteps; errorMessage: string }[] = [
  {
    step: AdoptionSteps.PetName,
    errorMessage: 'Nome do Pet não pode ser vazio',
  },
  {
    step: AdoptionSteps.PetBreed,
    errorMessage: 'Raça do Pet não pode ser vazia',
  },
  {
    step: AdoptionSteps.PetType,
    errorMessage: 'Informe o tipo do seu Pet',
  },
  {
    step: AdoptionSteps.PetAge,
    errorMessage: 'Informe a idade do seu Pet',
  },
  {
    step: AdoptionSteps.PetGender,
    errorMessage: 'Informe o sexo do seu Pet',
  },
  {
    step: AdoptionSteps.PetSize,
    errorMessage: 'Informe o porte do seu Pet',
  },
];

describe('PetForm', () => {
  describe('when the user presses the confirm button', () => {
    describe('and the form state is valid', () => {
      it('takes the user to the home screen', async () => {
        renderWithProviders(<MainNavigator />);

        await goToLastStep();

        const confirmButton = screen.getByText(/confirmar/i);

        act(() => {
          fireEvent.press(confirmButton);
        });

        const home = await screen.findByText(/welcome to animavita/i);
        expect(home).toBeOnTheScreen();
      });
    });

    describe('and the form state is not valid', () => {
      it('shows the error message', async () => {
        renderWithProviders(
          <MainNavigator
            petForm={() => (
              <PetForm initialStep={AdoptionSteps.PetObservations} title="Register Pet" />
            )}
          />
        );

        const confirmButton = screen.getByText(/confirmar/i);
        fireEvent.press(confirmButton);

        await waitFor(() =>
          expect(mockShow).toHaveBeenNthCalledWith(1, {
            description: `Dados inválidos!`,
          })
        );
      });
    });
  });

  describe.each(stepErrors)('when the $step step is invalid', ({ step, errorMessage }) => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('shows the error message', async () => {
      renderWithProviders(
        <MainNavigator petForm={() => <PetForm initialStep={step} title="Register Pet" />} />
      );

      forwardStep();

      await waitFor(() =>
        expect(mockShow).toHaveBeenNthCalledWith(1, {
          description: errorMessage,
          id: 'adoption-form-toast',
        })
      );
    });
  });
});
