import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RegisterAdoptionForm from './adoption-form.component';
import Routes from '../../routes';
import Home from '../../screens/home/home.screen';
import { renderWithProviders, screen, fireEvent, act } from '../../test/test-utils';

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

describe('AdoptionForm', () => {
  describe('when the users presses the confirm button', () => {
    describe('and the form state is valid', () => {
      it('takes the user to the home screen', async () => {
        renderWithProviders(<MainNavigator />);

        await goToLastStep();

        const confirmButton = screen.getByText(/confirmar/i);

        await act(async () => {
          fireEvent.press(confirmButton);
          const home = await screen.findByText(/adoptions demo/i);
          expect(home).toBeOnTheScreen();
        });
      });
    });

    // and the form state is not valid
  });

  // test validation for EACH step
});
