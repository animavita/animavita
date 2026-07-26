import { AdoptionRequestResponse, AdoptionRequestStatus } from '@animavita/types';
import { screen, waitFor } from '@testing-library/react-native';
import { http, HttpResponse } from 'msw';
import { useToast } from 'native-base';
import React from 'react';

import { AdoptionRequestDetail } from './adoption-request-detail';

import { server } from '@/test/msw/server';
import { renderWithProviders } from '@/test/test-utils';

const mockGoBack = jest.fn();
const mockNavigate = jest.fn();

jest.mock('@/navigation/use-navigation', () => ({
  useNavigation: () => ({
    goBack: mockGoBack,
    navigate: mockNavigate,
  }),
}));

const mockPendingRequest: AdoptionRequestResponse = {
  id: '1',
  status: AdoptionRequestStatus.PENDING,
  denialReason: null,
  petId: 'pet1',
  adopterId: 'adopter1',
  pet: {
    id: 'pet1',
    name: 'Rex',
    breed: 'Labrador',
    type: 'dog',
    owner: {
      id: 'owner1',
      name: 'Maria Silva',
    },
  },
  adopter: {
    id: 'adopter1',
    name: 'John Doe',
  },
  createdAt: '2025-01-15T10:30:00.000Z',
  updatedAt: '2025-01-15T10:30:00.000Z',
};

const mockAcceptedRequest: AdoptionRequestResponse = {
  ...mockPendingRequest,
  id: '2',
  status: AdoptionRequestStatus.ACCEPTED,
  updatedAt: '2025-01-15T14:30:00.000Z',
};

const mockDeniedRequest: AdoptionRequestResponse = {
  ...mockPendingRequest,
  id: '3',
  status: AdoptionRequestStatus.DENIED,
  denialReason: 'rejected_by_owner',
  updatedAt: '2025-01-15T16:30:00.000Z',
};

const mockToastShow = jest.fn();

describe('AdoptionRequestDetail (Owner)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useToast as jest.Mock).mockReturnValue({ show: mockToastShow, isActive: jest.fn() });
  });

  describe('pending request', () => {
    const route = {
      params: {
        request: mockPendingRequest,
      },
    };

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

    it('displays pending status badge', () => {
      renderWithProviders(<AdoptionRequestDetail route={route} />);

      expect(screen.getByText('Aguardando sua resposta')).toBeVisible();
    });

    it('displays formatted request date', () => {
      renderWithProviders(<AdoptionRequestDetail route={route} />);

      expect(screen.getByText(/15 de janeiro de 2025/)).toBeVisible();
    });

    it('displays adopter name', () => {
      renderWithProviders(<AdoptionRequestDetail route={route} />);

      expect(screen.getByText('John Doe')).toBeVisible();
    });

    it('displays adopter info section title', () => {
      renderWithProviders(<AdoptionRequestDetail route={route} />);

      expect(screen.getByText('Informações do Adotante')).toBeVisible();
    });

    it('displays contact info notice', () => {
      renderWithProviders(<AdoptionRequestDetail route={route} />);

      expect(
        screen.getByText(
          'As informações de contato serão compartilhadas após a aprovação da solicitação.'
        )
      ).toBeVisible();
    });

    it('displays accept button', () => {
      renderWithProviders(<AdoptionRequestDetail route={route} />);

      expect(screen.getByText('Aprovar Adoção')).toBeVisible();
    });

    it('displays deny button', () => {
      renderWithProviders(<AdoptionRequestDetail route={route} />);

      expect(screen.getByText('Recusar Solicitação')).toBeVisible();
    });

    it('calls handleAcceptRequest when accept button is pressed', async () => {
      const { user } = renderWithProviders(<AdoptionRequestDetail route={route} />);

      const acceptButton = screen.getByText('Aprovar Adoção');
      await user.press(acceptButton);

      expect(mockGoBack).toHaveBeenCalled();
    });

    it('denies the request and leaves the screen when deny button is pressed', async () => {
      const deniedRequestIds: string[] = [];

      server.use(
        http.patch('*/api/v1/adoption-requests/:id/deny', ({ params }) => {
          deniedRequestIds.push(params.id as string);
          return new HttpResponse(null, { status: 200 });
        })
      );

      const { user } = renderWithProviders(<AdoptionRequestDetail route={route} />);

      const denyButton = screen.getByText('Recusar Solicitação');
      await user.press(denyButton);

      await waitFor(() => {
        expect(deniedRequestIds).toEqual(['1']);
      });

      await waitFor(() => {
        expect(mockGoBack).toHaveBeenCalled();
      });
    });

    it('confirms the denial to the owner', async () => {
      server.use(
        http.patch('*/api/v1/adoption-requests/:id/deny', () => {
          return new HttpResponse(null, { status: 200 });
        })
      );

      const { user } = renderWithProviders(<AdoptionRequestDetail route={route} />);

      await user.press(screen.getByText('Recusar Solicitação'));

      await waitFor(() => {
        expect(mockToastShow).toHaveBeenCalledWith(
          expect.objectContaining({ title: 'Solicitação recusada' })
        );
      });
    });

    it('tells the owner when the request had already been resolved elsewhere', async () => {
      server.use(
        http.patch('*/api/v1/adoption-requests/:id/deny', () => {
          return HttpResponse.json(
            { message: 'Only pending adoption requests can be denied' },
            { status: 409 }
          );
        })
      );

      const { user } = renderWithProviders(<AdoptionRequestDetail route={route} />);

      await user.press(screen.getByText('Recusar Solicitação'));

      await waitFor(() => {
        expect(mockToastShow).toHaveBeenCalledWith(
          expect.objectContaining({ title: 'Esta solicitação já foi respondida' })
        );
      });

      await waitFor(() => {
        expect(mockGoBack).toHaveBeenCalled();
      });
    });

    it('does not show already handled message', () => {
      renderWithProviders(<AdoptionRequestDetail route={route} />);

      expect(screen.queryByText('Esta solicitação já foi aprovada')).not.toBeOnTheScreen();
      expect(screen.queryByText('Esta solicitação já foi recusada')).not.toBeOnTheScreen();
    });
  });

  describe('accepted request', () => {
    const route = {
      params: {
        request: mockAcceptedRequest,
      },
    };

    it('displays accepted status badge', () => {
      renderWithProviders(<AdoptionRequestDetail route={route} />);

      expect(screen.getByText('Aprovada')).toBeVisible();
    });

    it('displays already accepted message', () => {
      renderWithProviders(<AdoptionRequestDetail route={route} />);

      expect(screen.getByText('Esta solicitação já foi aprovada')).toBeVisible();
    });

    it('does not display accept button', () => {
      renderWithProviders(<AdoptionRequestDetail route={route} />);

      expect(screen.queryByText('Aprovar Adoção')).not.toBeOnTheScreen();
    });

    it('does not display deny button', () => {
      renderWithProviders(<AdoptionRequestDetail route={route} />);

      expect(screen.queryByText('Recusar Solicitação')).not.toBeOnTheScreen();
    });
  });

  describe('denied request', () => {
    const route = {
      params: {
        request: mockDeniedRequest,
      },
    };

    it('displays denied status badge', () => {
      renderWithProviders(<AdoptionRequestDetail route={route} />);

      expect(screen.getByText('Recusada')).toBeVisible();
    });

    it('displays already denied message', () => {
      renderWithProviders(<AdoptionRequestDetail route={route} />);

      expect(screen.getByText('Esta solicitação já foi recusada')).toBeVisible();
    });

    it('does not display accept button', () => {
      renderWithProviders(<AdoptionRequestDetail route={route} />);

      expect(screen.queryByText('Aprovar Adoção')).not.toBeOnTheScreen();
    });

    it('does not display deny button', () => {
      renderWithProviders(<AdoptionRequestDetail route={route} />);

      expect(screen.queryByText('Recusar Solicitação')).not.toBeOnTheScreen();
    });
  });

  describe('cat adoption request', () => {
    const catRequest: AdoptionRequestResponse = {
      ...mockPendingRequest,
      pet: {
        ...mockPendingRequest.pet,
        name: 'Mittens',
        breed: 'Persian',
        type: 'cat',
      },
    };

    const route = {
      params: {
        request: catRequest,
      },
    };

    it('displays cat type correctly', () => {
      renderWithProviders(<AdoptionRequestDetail route={route} />);

      expect(screen.getByText('Gato')).toBeVisible();
    });

    it('displays cat name', () => {
      renderWithProviders(<AdoptionRequestDetail route={route} />);

      expect(screen.getByText('Mittens')).toBeVisible();
    });
  });
});
