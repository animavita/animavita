import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screen, waitFor } from '@testing-library/react-native';
import { http, HttpResponse } from 'msw';
import React from 'react';
import { Text } from 'react-native';

import RequestsTab from './requests-tab';

import { StackParamsList } from '@/navigation/main-navigator';
import { AdoptionRequestResponse, AdoptionRequestStatus } from '@/services/adoptions';
import { server } from '@/test/msw/server';
import { renderWithProviders } from '@/test/test-utils';

const mockRequests: AdoptionRequestResponse[] = [
  {
    id: '1',
    petId: 'pet1',
    adopterId: 'adopter1',
    status: AdoptionRequestStatus.PENDING,
    pet: {
      id: 'pet1',
      name: 'Rex',
      breed: 'Labrador',
      type: 'dog',
    },
    adopter: {
      id: 'adopter1',
      name: 'John Doe',
    },
    createdAt: '2024-12-31T00:00:00.000Z',
    updatedAt: '2024-12-31T00:00:00.000Z',
  },
  {
    id: '2',
    petId: 'pet2',
    adopterId: 'adopter2',
    status: AdoptionRequestStatus.ACCEPTED,
    pet: {
      id: 'pet2',
      name: 'Mittens',
      breed: 'Persian',
      type: 'cat',
    },
    adopter: {
      id: 'adopter2',
      name: 'Jane Smith',
    },
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: '3',
    petId: 'pet3',
    adopterId: 'adopter3',
    status: AdoptionRequestStatus.DENIED,
    pet: {
      id: 'pet3',
      name: 'Buddy',
      breed: 'Golden Retriever',
      type: 'dog',
    },
    adopter: {
      id: 'adopter3',
      name: 'Bob Johnson',
    },
    createdAt: '2025-01-02T00:00:00.000Z',
    updatedAt: '2025-01-02T00:00:00.000Z',
  },
];

describe('RequestsTab (Owner)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('loading state', () => {
    beforeEach(() => {
      server.use(
        http.get('*/api/v1/adoption-requests/my', async () => {
          return HttpResponse.json(mockRequests);
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
          return HttpResponse.json(mockRequests);
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

    it('displays adopter names for each request', async () => {
      renderWithProviders(<RequestsTab />);

      await waitFor(() => {
        expect(screen.getByText(/John Doe/)).toBeVisible();
        expect(screen.getByText(/Jane Smith/)).toBeVisible();
        expect(screen.getByText(/Bob Johnson/)).toBeVisible();
      });
    });

    it('displays status badges with correct colors', async () => {
      renderWithProviders(<RequestsTab />);

      await waitFor(() => {
        expect(screen.getByText('Aguardando sua resposta')).toBeVisible();
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

    it('navigates to detail screen when request card is pressed', async () => {
      const Stack = createNativeStackNavigator<StackParamsList>();

      const MainNavigator = () => {
        return (
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={RequestsTab} />
            <Stack.Screen name="AdoptionRequestDetail">
              {() => {
                return <Text>AdoptionRequestDetail screen</Text>;
              }}
            </Stack.Screen>
          </Stack.Navigator>
        );
      };

      const { user } = renderWithProviders(<MainNavigator />);

      await waitFor(() => {
        expect(screen.getByText('Rex')).toBeVisible();
      });

      const requestCard = screen.getByText('Rex').parent?.parent?.parent;
      await user.press(requestCard!);

      expect(screen.getByText('AdoptionRequestDetail screen')).toBeVisible();
    });

    it('displays pet type icons', async () => {
      renderWithProviders(<RequestsTab />);

      await waitFor(() => {
        const dogTypes = screen.getAllByText('Cão');
        expect(dogTypes.length).toBeGreaterThan(0);
        expect(screen.getByText('Gato')).toBeVisible();
      });
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
          return HttpResponse.json(mockRequests);
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
        expect(screen.getByText('Você ainda não recebeu solicitações de adoção')).toBeVisible();
      });
    });

    it('shows empty list description', async () => {
      renderWithProviders(<RequestsTab />);

      await waitFor(() => {
        expect(
          screen.getByText(
            'Quando alguém se interessar em adotar um dos seus pets, as solicitações aparecerão aqui.'
          )
        ).toBeVisible();
      });
    });
  });
});
