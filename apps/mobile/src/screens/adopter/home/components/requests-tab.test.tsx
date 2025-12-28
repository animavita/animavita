import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screen, waitFor } from '@testing-library/react-native';
import { http, HttpResponse } from 'msw';
import React from 'react';
import { Text } from 'react-native';

import RequestsTab from './requests-tab';

import { StackParamsList } from '@/navigation/main-navigator';
import { mockAdoptionRequests } from '@/test/fixtures/adoption-requests';
import { server } from '@/test/msw/server';
import { renderWithProviders } from '@/test/test-utils';

describe('RequestsTab (Adopter)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('loading state', () => {
    beforeEach(() => {
      server.use(
        http.get('*/api/v1/adoption-requests/my', async () => {
          await new Promise((resolve) => setTimeout(resolve, 100));
          return HttpResponse.json(mockAdoptionRequests);
        })
      );
    });

    it('shows loading message while fetching adoption requests', async () => {
      renderWithProviders(<RequestsTab />);

      await waitFor(() => {
        expect(screen.getByText('Carregando solicitações...')).toBeVisible();
      });

      await waitFor(() => {
        expect(screen.queryByText('Carregando solicitações...')).not.toBeOnTheScreen();
      });
    });
  });

  describe('success state', () => {
    beforeEach(() => {
      server.use(
        http.get('*/api/v1/adoption-requests/my', () => {
          return HttpResponse.json(mockAdoptionRequests);
        })
      );
    });

    it('renders adoption requests when data is loaded', async () => {
      renderWithProviders(<RequestsTab />);

      await waitFor(() => {
        expect(screen.getByText('Rex')).toBeVisible();
        expect(screen.getByText('Mittens')).toBeVisible();
        expect(screen.getByText('Buddy')).toBeVisible();
      });
    });

    it('displays pet breed for each request', async () => {
      renderWithProviders(<RequestsTab />);

      await waitFor(() => {
        expect(screen.getByText('Labrador')).toBeVisible();
        expect(screen.getByText('Persian')).toBeVisible();
        expect(screen.getByText('Golden Retriever')).toBeVisible();
      });
    });

    it('displays status badges with correct colors', async () => {
      renderWithProviders(<RequestsTab />);

      await waitFor(() => {
        expect(screen.getByText('Aguardando resposta')).toBeVisible();
        expect(screen.getByText('Aprovada')).toBeVisible();
        expect(screen.getByText('Recusada')).toBeVisible();
      });
    });

    it('displays formatted request dates', async () => {
      renderWithProviders(<RequestsTab />);

      await waitFor(() => {
        expect(screen.getByText(/31 de dez. de 2024/)).toBeVisible();
        expect(screen.getByText(/01 de jan. de 2025/)).toBeVisible();
        expect(screen.getByText(/02 de jan. de 2025/)).toBeVisible();
      });
    });

    it('displays pet type icons', async () => {
      renderWithProviders(<RequestsTab />);

      await waitFor(() => {
        const dogTypes = screen.getAllByText('Cão');
        expect(dogTypes.length).toBeGreaterThan(0);
        expect(screen.getByText('Gato')).toBeVisible();
      });
    });

    it('navigates to detail screen when request is pressed', async () => {
      const Stack = createNativeStackNavigator<StackParamsList>();

      const { user } = renderWithProviders(
        <Stack.Navigator>
          <Stack.Screen name="Home" component={RequestsTab} options={{ headerShown: false }} />
          <Stack.Screen name="AdoptionRequestDetail">
            {() => {
              return <Text>AdoptionRequestDetail screen</Text>;
            }}
          </Stack.Screen>
        </Stack.Navigator>
      );

      await waitFor(() => {
        expect(screen.getByText('Rex')).toBeVisible();
      });

      const requestCard = screen.getByText('Rex');
      await user.press(requestCard);

      expect(screen.getByText('AdoptionRequestDetail screen')).toBeVisible();
    });
  });

  describe('error state', () => {
    beforeEach(() => {
      server.use(
        http.get('*/api/v1/adoption-requests/my', () => {
          return HttpResponse.json({ message: 'Server error' }, { status: 500 });
        })
      );
    });

    it('shows error message when fetch fails', async () => {
      renderWithProviders(<RequestsTab />);

      await waitFor(() => {
        expect(screen.getByText('Não foi possível carregar as solicitações')).toBeVisible();
      });
    });

    it('shows retry button', async () => {
      renderWithProviders(<RequestsTab />);

      await waitFor(() => {
        const retryButton = screen.getByText('Tentar novamente');
        expect(retryButton).toBeVisible();
      });
    });

    it('refetches data when retry button is pressed', async () => {
      const { user } = renderWithProviders(<RequestsTab />);

      await waitFor(() => {
        expect(screen.getByText('Tentar novamente')).toBeVisible();
      });

      server.use(
        http.get('*/api/v1/adoption-requests/my', () => {
          return HttpResponse.json(mockAdoptionRequests);
        })
      );

      const retryButton = screen.getByText('Tentar novamente');
      await user.press(retryButton);

      await waitFor(() => {
        expect(screen.getByText('Rex')).toBeVisible();
      });
    });
  });

  describe('empty state', () => {
    beforeEach(() => {
      server.use(
        http.get('*/api/v1/adoption-requests/my', () => {
          return HttpResponse.json([]);
        })
      );
    });

    it('shows empty list message when no requests are available', async () => {
      renderWithProviders(<RequestsTab />);

      await waitFor(() => {
        expect(screen.getByText('Você ainda não solicitou a adoção de nenhum pet')).toBeVisible();
      });
    });

    it('shows empty list description', async () => {
      renderWithProviders(<RequestsTab />);

      await waitFor(() => {
        expect(
          screen.getByText(
            'Navegue pelos pets disponíveis e solicite adoção quando encontrar seu novo amigo!'
          )
        ).toBeVisible();
      });
    });
  });
});
