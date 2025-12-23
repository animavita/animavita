import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screen, waitFor } from '@testing-library/react-native';
import { http, HttpResponse } from 'msw';
import React from 'react';
import { Text } from 'react-native';

import PetsTab from './pets-tab';

import { StackParamsList } from '@/navigation/main-navigator';
import { server } from '@/test/msw/server';
import { renderWithProviders } from '@/test/test-utils';

const mockPets = [
  {
    id: '1',
    name: 'Rex',
    maturity: 'young',
    breed: 'Labrador',
    gender: 'male',
    observations: 'Friendly dog',
    photos: ['https://example.com/rex.jpg'],
    size: 'big',
    type: 'dog',
  },
  {
    id: '2',
    name: 'Mittens',
    maturity: 'puppy',
    breed: 'Persian',
    gender: 'female',
    observations: 'Cute cat',
    photos: ['https://example.com/mittens.jpg'],
    size: 'small',
    type: 'cat',
  },
];

describe('Owner PetsTab', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('loading state', () => {
    it('shows loading skeleton while fetching pets', async () => {
      renderWithProviders(<PetsTab />);

      await waitFor(() => {
        const loadingView = screen.getByLabelText('Carregando pets disponíveis');
        expect(loadingView).toBeVisible();
      });

      await waitFor(() => {
        expect(screen.queryByLabelText('Carregando pets disponíveis')).not.toBeOnTheScreen();
      });
    });
  });

  describe('success state', () => {
    beforeEach(() => {
      server.use(
        http.get('*/api/v1/pets/my', () => {
          return HttpResponse.json(mockPets);
        })
      );
    });

    it('renders pets when data is loaded', async () => {
      renderWithProviders(<PetsTab />);

      await waitFor(() => {
        expect(screen.getByText('Rex')).toBeVisible();
      });

      await waitFor(() => {
        expect(screen.getByText('Mittens')).toBeVisible();
      });
    });

    it('shows register pet button', async () => {
      renderWithProviders(<PetsTab />);

      await waitFor(() => {
        const registerButton = screen.getByLabelText('Adicionar Pet para Adoção');
        expect(registerButton).toBeVisible();
      });
    });

    it('navigates to register pet screen when FAB is pressed', async () => {
      const Stack = createNativeStackNavigator<StackParamsList>();

      const MainNavigator = () => {
        return (
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={PetsTab} />
            <Stack.Screen name="RegisterPet">
              {() => {
                return <Text>RegisterPet screen</Text>;
              }}
            </Stack.Screen>
          </Stack.Navigator>
        );
      };

      const { user } = renderWithProviders(<MainNavigator />);

      await waitFor(() => {
        expect(screen.getByText('Rex')).toBeVisible();
      });

      const registerButton = screen.getByLabelText('Adicionar Pet para Adoção');
      await user.press(registerButton);

      expect(screen.getByText('RegisterPet screen')).toBeVisible();
    });
  });

  describe('error state', () => {
    beforeEach(() => {
      server.use(
        http.get('*/api/v1/pets/my', () => {
          return HttpResponse.json({ message: 'Server error' }, { status: 500 });
        })
      );
    });

    it('shows error message when fetch fails', async () => {
      renderWithProviders(<PetsTab />);

      await waitFor(() => {
        expect(screen.getByText('Ocorreu um erro. Tente novamente mais tarde.')).toBeVisible();
      });
    });

    it('shows error description', async () => {
      renderWithProviders(<PetsTab />);

      await waitFor(() => {
        expect(
          screen.getByText(
            'Não foi possível carregar os pets. Verifique sua conexão e tente novamente.'
          )
        ).toBeVisible();
      });
    });

    it('shows retry button', async () => {
      renderWithProviders(<PetsTab />);

      await waitFor(() => {
        const retryButton = screen.getByRole('button', { name: 'Tentar novamente' });
        expect(retryButton).toBeVisible();
      });
    });

    describe('when retry is pressed', () => {
      beforeEach(() => {
        let callCount = 0;
        server.use(
          http.get('*/api/v1/pets/my', () => {
            callCount++;
            if (callCount === 1) {
              return HttpResponse.json({ message: 'Server error' }, { status: 500 });
            }
            return HttpResponse.json(mockPets);
          })
        );
      });

      it('refetches data when retry button is pressed', async () => {
        const { user } = renderWithProviders(<PetsTab />);

        await waitFor(() => {
          expect(screen.getByText('Ocorreu um erro. Tente novamente mais tarde.')).toBeVisible();
        });

        const retryButton = screen.getByRole('button', { name: 'Tentar novamente' });
        await user.press(retryButton);

        await waitFor(() => {
          expect(screen.getByText('Rex')).toBeVisible();
        });
      });
    });
  });

  describe('empty state', () => {
    beforeEach(() => {
      server.use(
        http.get('*/api/v1/pets/my', () => {
          return HttpResponse.json([]);
        })
      );
    });

    it('shows empty message when no pets are registered', async () => {
      renderWithProviders(<PetsTab />);

      await waitFor(() => {
        expect(screen.getByText('Você ainda não registou nenhum pet para adoção')).toBeVisible();
      });
    });

    it('shows empty description', async () => {
      renderWithProviders(<PetsTab />);

      await waitFor(() => {
        expect(
          screen.getByText('Toque no botão + para registrar seu primeiro pet para adoção')
        ).toBeVisible();
      });
    });

    it('shows register pet button in empty state', async () => {
      renderWithProviders(<PetsTab />);

      await waitFor(() => {
        const registerButton = screen.getByLabelText('Adicionar Pet para Adoção');
        expect(registerButton).toBeVisible();
      });
    });
  });
});
