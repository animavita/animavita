import { screen, waitFor } from '@testing-library/react-native';
import { http, HttpResponse } from 'msw';
import React from 'react';

import PetsTab from './pets-tab';

import { PetNearMeResponse } from '@/services/pets';
import { server } from '@/test/msw/server';
import { renderWithProviders } from '@/test/test-utils';

// Mock @expo/vector-icons to avoid font loading issues
jest.mock('@expo/vector-icons', () => {
  const { Text } = require('react-native');
  return {
    Ionicons: (props: any) => <Text {...props}>{props.name}</Text>,
  };
});

const mockPets: PetNearMeResponse[] = [
  {
    id: '1',
    name: 'Rex',
    age: 'young',
    breed: 'Labrador',
    gender: 'male',
    location: {
      longitude: -46.633308,
      latitude: -23.55052,
    },
    observations: 'Friendly dog',
    photos: ['https://example.com/rex.jpg'],
    size: 'big',
    type: 'dog',
    user: {
      id: 'user1',
      name: 'John Doe',
    },
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    name: 'Mittens',
    age: 'puppy',
    breed: 'Persian',
    gender: 'female',
    location: {
      longitude: -46.633308,
      latitude: -23.55052,
    },
    observations: 'Cute cat',
    photos: ['https://example.com/mittens.jpg'],
    size: 'small',
    type: 'cat',
    user: {
      id: 'user2',
      name: 'Jane Smith',
    },
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
  },
];

describe('PetsTab', () => {
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
        http.get('*/api/v1/pets/nearMe', ({ request }) => {
          return HttpResponse.json(mockPets);
        })
      );
    });

    it('renders pets when data is loaded', async () => {
      renderWithProviders(<PetsTab />);

      await waitFor(() => {
        expect(screen.getByText('Rex')).toBeVisible();
      });
    });

    it('shows filter button', async () => {
      renderWithProviders(<PetsTab />);

      await waitFor(() => {
        const filterButton = screen.getByRole('button', { name: 'Filtrar' });
        expect(filterButton).toBeVisible();
        expect(screen.getByText('Rex')).toBeVisible();
      });
    });
  });

  describe('error state', () => {
    beforeEach(() => {
      server.use(
        http.get('*/api/v1/pets/nearMe', ({ request }) => {
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
  });

  describe('empty state - no pets found', () => {
    beforeEach(() => {
      server.use(
        http.get('*/api/v1/pets/nearMe', ({ request }) => {
          return HttpResponse.json([]);
        })
      );
    });

    it('shows no pets nearby message when no pets are available', async () => {
      renderWithProviders(<PetsTab />);

      await waitFor(() => {
        expect(screen.getByText('Nenhum pet por perto')).toBeVisible();
      });
    });

    it('shows no pets nearby description', async () => {
      renderWithProviders(<PetsTab />);

      await waitFor(() => {
        expect(
          screen.getByText(
            'Não encontramos nenhum pet disponível para adoção na sua região. Tente ajustar os filtros ou verifique novamente mais tarde.'
          )
        ).toBeVisible();
      });
    });
  });

  describe('empty state - all pets swiped', () => {
    beforeEach(() => {
      server.use(
        http.get('*/api/v1/pets/nearMe', ({ request }) => {
          return HttpResponse.json([mockPets[0]]);
        })
      );
    });

    it('shows no more pets message when only one pet remains', async () => {
      renderWithProviders(<PetsTab />);

      await waitFor(() => {
        expect(screen.getByText('Você viu todos os pets!')).toBeVisible();
      });
    });

    it('shows no more pets description when only one pet remains', async () => {
      renderWithProviders(<PetsTab />);

      await waitFor(() => {
        // Element is rendered but may have low opacity due to animation state
        expect(
          screen.getByText(
            'Não há mais pets para mostrar no momento. Volte mais tarde para ver novos amiguinhos disponíveis para adoção.'
          )
        ).toBeOnTheScreen();
      });
    });
  });
});
