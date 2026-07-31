import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { act } from '@testing-library/react-native';
import { http, HttpResponse } from 'msw';
import { Text } from 'react-native';

import PetForm from './pet-form.component';
import { AdoptionSteps } from './pet-form.types';

import { StackParamsList } from '@/navigation/main-navigator';
import { server } from '@/test/msw/server';
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

const VALID_PHOTOS = [
  { uri: 'https://example.com/photo1.jpg', isUploaded: true },
  { uri: 'https://example.com/photo2.jpg', isUploaded: true },
  { uri: 'https://example.com/photo3.jpg', isUploaded: true },
];

const PENDING_PHOTOS = [
  { uri: 'data:image/jpeg;base64,cGhvdG8x', isUploaded: false },
  { uri: 'data:image/jpeg;base64,cGhvdG8y', isUploaded: false },
  { uri: 'data:image/jpeg;base64,cGhvdG8z', isUploaded: false },
];

const createDeferredUpload = () => {
  let resolve = () => {};
  const promise = new Promise<void>((complete) => {
    resolve = complete;
  });

  return {
    promise,
    resolve,
  };
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
  await screen.findByAccessibilityHint(/selecione a principal foto do pet/i);
  forwardStep();
  await screen.findByText(/confirmar/i);
};

const Stack = createNativeStackNavigator<StackParamsList>();

const MainNavigator = ({ petForm }: { petForm?: () => React.ReactNode }) => {
  const defaultForm = () => (
    <PetForm defaultValues={{ maturity: 'adult', photos: VALID_PHOTOS }} title="Register Pet" />
  );

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
    step: AdoptionSteps.PetMaturity,
    errorMessage: 'Informe a maturidade do seu Pet',
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

      it('shows progress as each photo upload finishes', async () => {
        const pendingUploads = Array.from({ length: 3 }, createDeferredUpload);

        server.use(
          http.get('*', () => HttpResponse.text('photo')),
          http.post('*/api/v1/uploads/presigned-urls', () => {
            return HttpResponse.json({
              uploads: pendingUploads.map((_, index) => ({
                presignedUrl: `https://s3.example.com/uploads/${index}`,
                fields: {},
                fileUrl: `https://cdn.example.com/photos/${index}.jpg`,
                key: `photos/${index}.jpg`,
                expiresIn: 300,
                maxFileSize: 10_000_000,
              })),
            });
          }),
          ...pendingUploads.map((upload, index) =>
            http.post(`https://s3.example.com/uploads/${index}`, async () => {
              await upload.promise;
              return new HttpResponse(null, { status: 204 });
            })
          )
        );

        renderWithProviders(
          <MainNavigator
            petForm={() => (
              <PetForm
                initialStep={AdoptionSteps.PetObservations}
                defaultValues={{
                  name: 'Bob',
                  gender: 'male',
                  breed: 'pitbull',
                  type: 'dog',
                  maturity: 'adult',
                  size: 'big',
                  observations: '',
                  photos: PENDING_PHOTOS,
                }}
                title="Register Pet"
              />
            )}
          />
        );

        fireEvent.press(screen.getByText(/confirmar/i));

        expect(await screen.findByText(/0 de 3 fotos enviadas/i)).toBeOnTheScreen();

        await act(async () => {
          pendingUploads[0].resolve();
        });
        await waitFor(() => expect(screen.getByText(/1 de 3 fotos enviadas/i)).toBeOnTheScreen());

        await act(async () => {
          pendingUploads[1].resolve();
        });
        await waitFor(() => expect(screen.getByText(/2 de 3 fotos enviadas/i)).toBeOnTheScreen());

        await act(async () => {
          pendingUploads[2].resolve();
        });

        expect(await screen.findByText(/welcome to animavita/i)).toBeOnTheScreen();
        expect(screen.queryByText(/de 3 fotos enviadas/i)).not.toBeOnTheScreen();
      });
    });

    describe('and the form state is not valid', () => {
      it('shows the error message', async () => {
        renderWithProviders(
          <MainNavigator
            petForm={() => (
              <PetForm
                initialStep={AdoptionSteps.PetObservations}
                defaultValues={{ photos: VALID_PHOTOS }}
                title="Register Pet"
              />
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
