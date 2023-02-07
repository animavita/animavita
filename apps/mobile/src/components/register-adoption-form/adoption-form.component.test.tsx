import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RegisterAdoptionForm from './adoption-form.component';
import { AdoptionSteps } from './adoption-form.types';
import Routes from '../../routes';
import Home from '../../screens/home/home.screen';
import { renderWithProviders, screen, fireEvent, act, waitFor } from '../../test/test-utils';

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
  await screen.findByTestId(`adoption-form-age-input`);
  forwardStep();
  await pickOptionFromList(/macho/i);
  forwardStep();
  await pickOptionFromList(/grande/i);
  forwardStep();
  await screen.findByText(/confirmar/i);
};

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={Routes.RegisterAdoption}>
      <Stack.Screen name={Routes.Home} component={Home} />
      <Stack.Screen name={Routes.RegisterAdoption}>
        {() => <RegisterAdoptionForm defaultValues={{ age: 2 }} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const stepErrors: { step: AdoptionSteps; errorMessage: string }[] = [
  {
    step: AdoptionSteps.PetName,
    errorMessage: `"name" is required`,
  },
  {
    step: AdoptionSteps.PetBreed,
    errorMessage: `"breed" is required`,
  },
  {
    step: AdoptionSteps.PetType,
    errorMessage: `"type" is required`,
  },
  {
    step: AdoptionSteps.PetAge,
    errorMessage: `"age" is required`,
  },
  {
    step: AdoptionSteps.PetGender,
    errorMessage: `"gender" is required`,
  },
  {
    step: AdoptionSteps.PetSize,
    errorMessage: `"size" is required`,
  },
];

describe('AdoptionForm', () => {
  describe('when the user presses the confirm button', () => {
    describe('and the form state is valid', () => {
      it('takes the user to the home screen', async () => {
        renderWithProviders(<MainNavigator />);

        await goToLastStep();

        const confirmButton = screen.getByText(/confirmar/i);

        fireEvent.press(confirmButton);
        const home = await screen.findByText(/adoptions demo/i);
        expect(home).toBeOnTheScreen();
      });
    });

    describe('and the form state is not valid', () => {
      it('shows the error message', async () => {
        renderWithProviders(<RegisterAdoptionForm initialStep={AdoptionSteps.PetObservations} />);

        const confirmButton = screen.getByText(/confirmar/i);
        fireEvent.press(confirmButton);

        await waitFor(() =>
          expect(mockShow).toHaveBeenNthCalledWith(1, {
            description: `Invalid data!`,
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
      renderWithProviders(<RegisterAdoptionForm initialStep={step} />);

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
