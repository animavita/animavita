import { screen, waitFor, fireEvent } from '@testing-library/react-native';
import { http, HttpResponse } from 'msw';
import React from 'react';

import PetsTab from './pets-tab';

import { PetNearMeResponse } from '@/services/pets';
import { server } from '@/test/msw/server';
import { renderWithProviders } from '@/test/test-utils';

const mockToastShow = jest.fn();
jest.mock('native-base', () => ({
  ...jest.requireActual('native-base'),
  useToast: () => ({
    show: mockToastShow,
    isActive: () => false,
  }),
}));

jest.mock('@/services/local-storage', () => ({
  getSearchRadius: jest.fn().mockResolvedValue(null),
  saveSearchRadius: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('react-native-reanimated', () => {
  const actual = jest.requireActual('react-native-reanimated/mock');
  return {
    ...actual,
    useSharedValue: (initial: any) => ({ value: initial }),
    withTiming: (value: any, _config?: any, callback?: any) => {
      callback?.(true);
      return value;
    },
    withSpring: (value: any, _config?: any, callback?: any) => {
      callback?.(true);
      return value;
    },
    runOnJS: (fn: any) => fn,
  };
});

const mockPets: PetNearMeResponse[] = [
  {
    id: '1',
    name: 'Rex',
    maturity: 'young',
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
    maturity: 'puppy',
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
        expect(screen.getByText('Mittens')).toBeVisible();
      });
    });

    it('shows filter button', async () => {
      renderWithProviders(<PetsTab />);

      await waitFor(() => {
        const filterButton = screen.getByRole('button', { name: 'Filtrar' });
        expect(filterButton).toBeVisible();
      });
    });

    describe('when user applies a new radius', () => {
      beforeEach(() => {
        server.use(
          http.get('*/api/v1/pets/nearMe', ({ request }) => {
            const url = new URL(request.url);
            const radius = url.searchParams.get('radius');

            if (radius === '50') {
              return HttpResponse.json([
                {
                  ...mockPets[0],
                  id: '3',
                  name: 'Buddy',
                },
              ]);
            }

            return HttpResponse.json(mockPets);
          })
        );
      });

      it('updates pets list based on filter criteria', async () => {
        const { user } = renderWithProviders(<PetsTab />);

        await waitFor(() => {
          expect(screen.getByText('Mittens')).toBeVisible();
        });

        const filterButton = screen.getByRole('button', { name: 'Filtrar' });
        await user.press(filterButton);

        await waitFor(() => {
          expect(screen.getByText('Filtros')).toBeOnTheScreen();
        });

        const slider = screen.getByLabelText('Raio de busca');
        fireEvent(slider, 'valueChange', 50);

        const applyButton = screen.getByRole('button', { name: 'Aplicar' });
        await user.press(applyButton);

        await waitFor(() => {
          expect(screen.getByText('Buddy')).toBeVisible();
        });

        expect(screen.queryByText('Mittens')).not.toBeOnTheScreen();
      });
    });

    it('renders all three action buttons', async () => {
      renderWithProviders(<PetsTab />);

      await waitFor(() => {
        expect(screen.getByLabelText('Pular este pet')).toBeVisible();
        expect(screen.getByLabelText('Adicionar aos favoritos')).toBeVisible();
        expect(screen.getByLabelText('Solicitar adoção')).toBeVisible();
      });
    });

    describe('when user passes', () => {
      it('removes current pet from view when pressed', async () => {
        const { user } = renderWithProviders(<PetsTab />);

        await waitFor(() => {
          expect(screen.getByText('Mittens')).toBeVisible();
        });

        const passButton = screen.getByLabelText('Pular este pet');
        await user.press(passButton);

        await waitFor(() => {
          expect(screen.queryByText('Mittens')).not.toBeOnTheScreen();
        });
      });
    });

    describe('when user likes a pet', () => {
      it('removes current pet from view when pressed', async () => {
        const { user } = renderWithProviders(<PetsTab />);

        await waitFor(() => {
          expect(screen.getByText('Mittens')).toBeVisible();
        });

        const favoriteButton = screen.getByLabelText('Adicionar aos favoritos');
        await user.press(favoriteButton);

        await waitFor(() => {
          expect(screen.queryByText('Mittens')).not.toBeOnTheScreen();
        });
      });
    });

    describe('when user decides to adopt', () => {
      it('disables buttons when adoption request is pending', async () => {
        server.use(
          http.post('*/api/v1/pets/:petId/request', async () => {
            await new Promise((resolve) => setTimeout(resolve, 100));
            return HttpResponse.json({ success: true });
          })
        );

        const { user } = renderWithProviders(<PetsTab />);

        await waitFor(() => {
          expect(screen.getByText('Mittens')).toBeVisible();
        });

        const adoptButton = screen.getByLabelText('Solicitar adoção');
        await user.press(adoptButton);

        await waitFor(() => {
          expect(screen.getByLabelText('Pular este pet')).toBeDisabled();
          expect(screen.getByLabelText('Adicionar aos favoritos')).toBeDisabled();
          expect(screen.getByLabelText('Solicitar adoção')).toBeDisabled();
        });
      });

      it('removes pet card when adoption request succeeds', async () => {
        server.use(
          http.post('*/api/v1/pets/:petId/request', () => {
            return HttpResponse.json({ success: true });
          })
        );

        const { user } = renderWithProviders(<PetsTab />);

        await waitFor(() => {
          expect(screen.getByText('Mittens')).toBeVisible();
        });

        const adoptButton = screen.getByLabelText('Solicitar adoção');
        await user.press(adoptButton);

        await waitFor(() => {
          expect(screen.queryByText('Mittens')).not.toBeOnTheScreen();
        });
      });

      it('shows error toast when adoption request fails', async () => {
        server.use(
          http.post('*/api/v1/pets/:petId/request', () => {
            return HttpResponse.json({ message: 'Request failed' }, { status: 400 });
          })
        );

        const { user } = renderWithProviders(<PetsTab />);

        await waitFor(() => {
          expect(screen.getByText('Mittens')).toBeVisible();
        });

        const adoptButton = screen.getByLabelText('Solicitar adoção');
        await user.press(adoptButton);

        await waitFor(() => {
          expect(mockToastShow).toHaveBeenCalledWith(
            expect.objectContaining({
              title: 'Erro ao enviar solicitação de adoção. Tente novamente.',
            })
          );
        });
      });

      it('makes failed pet reappear in the deck', async () => {
        server.use(
          http.post('*/api/v1/pets/:petId/request', () => {
            return HttpResponse.json({ message: 'Request failed' }, { status: 400 });
          })
        );

        const { user } = renderWithProviders(<PetsTab />);

        await waitFor(() => {
          expect(screen.getByText('Mittens')).toBeVisible();
        });

        const adoptButton = screen.getByLabelText('Solicitar adoção');
        await user.press(adoptButton);

        await waitFor(() => {
          expect(mockToastShow).toHaveBeenCalledWith(
            expect.objectContaining({
              title: 'Erro ao enviar solicitação de adoção. Tente novamente.',
            })
          );
        });

        expect(screen.getByText('Mittens')).toBeVisible();
        expect(screen.getByLabelText('Solicitar adoção')).not.toBeDisabled();
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

    it('does not show action buttons', async () => {
      renderWithProviders(<PetsTab />);

      await waitFor(() => {
        expect(screen.getByText('Ocorreu um erro. Tente novamente mais tarde.')).toBeVisible();
      });

      expect(screen.queryByLabelText('Pular este pet')).not.toBeOnTheScreen();
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
        expect(screen.getByText('Você viu todos os pets!')).toBeOnTheScreen();
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
