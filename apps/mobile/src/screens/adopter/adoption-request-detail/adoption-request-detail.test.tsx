import { DenialReason } from '@animavita/types';
import { screen, waitFor } from '@testing-library/react-native';
import { http, HttpResponse } from 'msw';
import React from 'react';

import { AdoptionRequestDetail } from './adoption-request-detail';

import { AdoptionRequestStatus } from '@/services/adoptions';
import { mockAdoptionRequests } from '@/test/fixtures/adoption-requests';
import { server } from '@/test/msw/server';
import { renderWithProviders } from '@/test/test-utils';

const mockGoBack = jest.fn();

jest.mock('@/navigation/use-navigation', () => ({
  useNavigation: () => ({
    goBack: mockGoBack,
  }),
}));

const mockRequest = mockAdoptionRequests[0];

describe('AdoptionRequestDetail (Adopter)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const route = {
    params: {
      request: mockRequest,
    },
  };

  describe('pet information', () => {
    it('displays pet name', () => {
      renderWithProviders(<AdoptionRequestDetail route={route} />);

      expect(screen.getByText('Rex')).toBeVisible();
    });

    it('displays pet breed', () => {
      renderWithProviders(<AdoptionRequestDetail route={route} />);

      expect(screen.getByText('Labrador')).toBeVisible();
    });

    it('displays pet type', () => {
      renderWithProviders(<AdoptionRequestDetail route={route} />);

      expect(screen.getByText('Cão')).toBeVisible();
    });

    it('displays request date', () => {
      renderWithProviders(<AdoptionRequestDetail route={route} />);

      expect(screen.getByText(/31 de dezembro de 2024/i)).toBeVisible();
    });

    it('displays status badge', () => {
      renderWithProviders(<AdoptionRequestDetail route={route} />);

      expect(screen.getByText('Aguardando resposta')).toBeVisible();
    });
  });

  describe('owner information', () => {
    it('displays owner name', () => {
      renderWithProviders(<AdoptionRequestDetail route={route} />);

      expect(screen.getByText('Maria Silva')).toBeVisible();
    });

    it('displays contact info notice', () => {
      renderWithProviders(<AdoptionRequestDetail route={route} />);

      expect(
        screen.getByText(
          'As informações de contato serão compartilhadas após a aprovação da solicitação.'
        )
      ).toBeVisible();
    });
  });

  describe('actions', () => {
    it('displays cancel button for pending requests', () => {
      renderWithProviders(<AdoptionRequestDetail route={route} />);

      expect(screen.getByText('Cancelar Solicitação')).toBeVisible();
    });

    it('cancels the request and goes back when the cancel button is pressed', async () => {
      const cancelled: string[] = [];
      server.use(
        http.patch('*/api/v1/adoption-requests/:id/cancel', ({ params }) => {
          cancelled.push(params.id as string);
          return new HttpResponse(null, { status: 200 });
        })
      );

      const { user } = renderWithProviders(<AdoptionRequestDetail route={route} />);

      await user.press(screen.getByText('Cancelar Solicitação'));

      await waitFor(() => expect(cancelled).toEqual(['1']));
      await waitFor(() => expect(mockGoBack).toHaveBeenCalled());
    });

    it('stays on the screen when the request has already been resolved', async () => {
      let attempts = 0;
      server.use(
        http.patch('*/api/v1/adoption-requests/:id/cancel', () => {
          attempts += 1;
          return HttpResponse.json({ message: 'conflict' }, { status: 409 });
        })
      );

      const { user } = renderWithProviders(<AdoptionRequestDetail route={route} />);

      await user.press(screen.getByText('Cancelar Solicitação'));

      await waitFor(() => expect(attempts).toBe(1));
      expect(mockGoBack).not.toHaveBeenCalled();
      expect(screen.getByText('Cancelar Solicitação')).toBeVisible();
    });

    it('does not display cancel button for accepted requests', () => {
      const acceptedRoute = {
        params: {
          request: {
            ...mockRequest,
            status: AdoptionRequestStatus.ACCEPTED,
          },
        },
      };

      renderWithProviders(<AdoptionRequestDetail route={acceptedRoute} />);

      expect(screen.queryByText('Cancelar Solicitação')).not.toBeOnTheScreen();
    });

    it('does not display cancel button for denied requests', () => {
      const deniedRoute = {
        params: {
          request: {
            ...mockRequest,
            status: AdoptionRequestStatus.DENIED,
          },
        },
      };

      renderWithProviders(<AdoptionRequestDetail route={deniedRoute} />);

      expect(screen.queryByText('Cancelar Solicitação')).not.toBeOnTheScreen();
    });
  });

  describe('status messages', () => {
    it('shows already accepted message for accepted requests', () => {
      const acceptedRoute = {
        params: {
          request: {
            ...mockRequest,
            status: AdoptionRequestStatus.ACCEPTED,
          },
        },
      };

      renderWithProviders(<AdoptionRequestDetail route={acceptedRoute} />);

      expect(screen.getByText('Esta solicitação já foi aprovada')).toBeVisible();
    });

    it('shows already denied message for denied requests without a reason', () => {
      const deniedRoute = {
        params: {
          request: {
            ...mockRequest,
            status: AdoptionRequestStatus.DENIED,
          },
        },
      };

      renderWithProviders(<AdoptionRequestDetail route={deniedRoute} />);

      expect(screen.getByText('Esta solicitação já foi recusada')).toBeVisible();
    });

    it('tells the adopter the owner turned them down', () => {
      const deniedRoute = {
        params: {
          request: {
            ...mockRequest,
            status: AdoptionRequestStatus.DENIED,
            denialReason: DenialReason.REJECTED_BY_OWNER,
          },
        },
      };

      renderWithProviders(<AdoptionRequestDetail route={deniedRoute} />);

      expect(screen.getByText('O dono decidiu não seguir com esta adoção')).toBeVisible();
      expect(screen.getByText('Recusada pelo dono')).toBeVisible();
    });

    it('tells the adopter the pet found a home, not that they were rejected', () => {
      const cascadedRoute = {
        params: {
          request: {
            ...mockRequest,
            status: AdoptionRequestStatus.DENIED,
            denialReason: DenialReason.PET_ADOPTED,
          },
        },
      };

      renderWithProviders(<AdoptionRequestDetail route={cascadedRoute} />);

      expect(screen.getByText('Este pet encontrou um lar com outro adotante')).toBeVisible();
      expect(screen.getByText('Pet já adotado')).toBeVisible();
      expect(screen.queryByText('O dono decidiu não seguir com esta adoção')).not.toBeOnTheScreen();
    });

    it('tells the adopter they cancelled', () => {
      const cancelledRoute = {
        params: {
          request: { ...mockRequest, status: AdoptionRequestStatus.CANCELLED },
        },
      };

      renderWithProviders(<AdoptionRequestDetail route={cancelledRoute} />);

      expect(screen.getByText('Você cancelou esta solicitação')).toBeVisible();
      expect(screen.queryByText('Cancelar Solicitação')).not.toBeOnTheScreen();
    });

    it('does not show status message for pending requests', () => {
      renderWithProviders(<AdoptionRequestDetail route={route} />);

      expect(screen.queryByText('Esta solicitação já foi aprovada')).not.toBeOnTheScreen();
      expect(screen.queryByText('Esta solicitação já foi recusada')).not.toBeOnTheScreen();
    });
  });
});
