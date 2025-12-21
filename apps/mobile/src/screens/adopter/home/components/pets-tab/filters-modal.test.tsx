import React from 'react';
import { Animated } from 'react-native';

import { FiltersModal } from '@/screens/adopter/home/components/pets-tab/filters-modal';
import { renderWithProviders, screen } from '@/test/test-utils';

// Mock Animated.timing to execute immediately without scheduling state updates
jest.spyOn(Animated, 'timing').mockImplementation((value: any, config: any) => ({
  start: (callback?: (result: { finished: boolean }) => void) => {
    // Immediately set value without animations
    if (typeof config.toValue === 'number') {
      (value as any)._value = config.toValue;
    }
    callback?.({ finished: true });
  },
  stop: jest.fn(),
  reset: jest.fn(),
}));

describe('<FiltersModal />', () => {
  const mockOnClose = jest.fn();
  const mockOnApply = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when modal is open', () => {
    it('renders the modal with correct title', () => {
      renderWithProviders(
        <FiltersModal isOpen onClose={mockOnClose} onApply={mockOnApply}>
          <></>
        </FiltersModal>
      );

      expect(screen.getByText('Filtros')).toBeOnTheScreen();
    });

    it('renders apply and cancel buttons', () => {
      renderWithProviders(
        <FiltersModal isOpen onClose={mockOnClose} onApply={mockOnApply}>
          <></>
        </FiltersModal>
      );

      expect(screen.getByText('Aplicar')).toBeOnTheScreen();
      expect(screen.getByText('Cancelar')).toBeOnTheScreen();
    });

    it('renders children content', () => {
      renderWithProviders(
        <FiltersModal isOpen onClose={mockOnClose} onApply={mockOnApply}>
          <>Test Filter Content</>
        </FiltersModal>
      );

      expect(screen.getByText('Test Filter Content')).toBeOnTheScreen();
    });

    it('calls onClose when cancel button is pressed', async () => {
      const { user } = renderWithProviders(
        <FiltersModal isOpen onClose={mockOnClose} onApply={mockOnApply}>
          <></>
        </FiltersModal>
      );

      const cancelButton = screen.getByText('Cancelar');
      await user.press(cancelButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
      expect(mockOnApply).not.toHaveBeenCalled();
    });

    it('calls onApply and onClose when apply button is pressed', async () => {
      const { user } = renderWithProviders(
        <FiltersModal isOpen onClose={mockOnClose} onApply={mockOnApply}>
          <></>
        </FiltersModal>
      );

      const applyButton = screen.getByText('Aplicar');
      await user.press(applyButton);

      expect(mockOnApply).toHaveBeenCalledTimes(1);
      expect(mockOnApply).toHaveBeenCalledWith();
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('when modal is closed', () => {
    it('renders the component without error', () => {
      const result = renderWithProviders(
        <FiltersModal isOpen={false} onClose={mockOnClose} onApply={mockOnApply}>
          <></>
        </FiltersModal>
      );

      expect(result).toBeTruthy();
    });
  });
});
