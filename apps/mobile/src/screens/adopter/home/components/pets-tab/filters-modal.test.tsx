import { fireEvent } from '@testing-library/react-native';

import { FiltersModal } from '@/screens/adopter/home/components/pets-tab/filters-modal';
import { renderWithProviders, screen } from '@/test/test-utils';

describe('<FiltersModal />', () => {
  const mockOnClose = jest.fn();
  const mockOnApply = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when modal is open', () => {
    it('renders the modal with correct title', () => {
      renderWithProviders(
        <FiltersModal isOpen onClose={mockOnClose} currentRadius={20} onApply={mockOnApply} />
      );

      expect(screen.getByText('Filtros')).toBeOnTheScreen();
    });

    it('renders radius label and value', () => {
      renderWithProviders(
        <FiltersModal isOpen onClose={mockOnClose} currentRadius={20} onApply={mockOnApply} />
      );

      expect(screen.getByText('Raio de busca')).toBeOnTheScreen();
      expect(screen.getByText('20 km')).toBeOnTheScreen();
    });

    it('renders apply and cancel buttons', () => {
      renderWithProviders(
        <FiltersModal isOpen onClose={mockOnClose} currentRadius={20} onApply={mockOnApply} />
      );

      expect(screen.getByText('Aplicar')).toBeOnTheScreen();
      expect(screen.getByText('Cancelar')).toBeOnTheScreen();
    });

    it('calls onClose when cancel button is pressed', () => {
      renderWithProviders(
        <FiltersModal isOpen onClose={mockOnClose} currentRadius={20} onApply={mockOnApply} />
      );

      const cancelButton = screen.getByText('Cancelar');
      fireEvent.press(cancelButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
      expect(mockOnApply).not.toHaveBeenCalled();
    });

    it('calls onApply with radius and onClose when apply button is pressed', () => {
      renderWithProviders(
        <FiltersModal isOpen onClose={mockOnClose} currentRadius={20} onApply={mockOnApply} />
      );

      const applyButton = screen.getByText('Aplicar');
      fireEvent.press(applyButton);

      expect(mockOnApply).toHaveBeenCalledWith(20);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('when modal is closed', () => {
    it('renders the component without error', () => {
      const result = renderWithProviders(
        <FiltersModal
          isOpen={false}
          onClose={mockOnClose}
          currentRadius={20}
          onApply={mockOnApply}
        />
      );

      expect(result).toBeTruthy();
    });
  });
});
