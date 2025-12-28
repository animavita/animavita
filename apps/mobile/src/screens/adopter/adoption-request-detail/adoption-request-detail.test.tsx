import { screen, waitFor } from '@testing-library/react-native';
import React from 'react';

import { AdoptionRequestDetail } from './adoption-request-detail';

import { AdoptionRequestStatus } from '@/services/adoptions';
import { mockAdoptionRequests } from '@/test/fixtures/adoption-requests';
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

    it('calls handleCancelRequest when cancel button is pressed', async () => {
      const { user } = renderWithProviders(<AdoptionRequestDetail route={route} />);

      const cancelButton = screen.getByText('Cancelar Solicitação');
      await user.press(cancelButton);

      await waitFor(() => {
        expect(mockGoBack).toHaveBeenCalled();
      });
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

    it('shows already denied message for denied requests', () => {
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

    it('does not show status message for pending requests', () => {
      renderWithProviders(<AdoptionRequestDetail route={route} />);

      expect(screen.queryByText('Esta solicitação já foi aprovada')).not.toBeOnTheScreen();
      expect(screen.queryByText('Esta solicitação já foi recusada')).not.toBeOnTheScreen();
    });
  });
});
