import { renderHook, act } from '@testing-library/react-native';

import { useFilters } from './use-filters';

describe('useFilters', () => {
  describe('modal controls', () => {
    it('opens filter modal when open is called', () => {
      const mockFilter = {
        value: 20,
        isApplied: false,
        save: jest.fn(),
      };

      const { result } = renderHook(() => useFilters({ filters: [mockFilter] }));

      expect(result.current.isOpen).toBe(false);

      act(() => {
        result.current.open();
      });

      expect(result.current.isOpen).toBe(true);
    });

    it('closes filter modal when close is called', () => {
      const mockFilter = {
        value: 20,
        isApplied: false,
        save: jest.fn(),
      };

      const { result } = renderHook(() => useFilters({ filters: [mockFilter] }));

      act(() => {
        result.current.open();
      });
      expect(result.current.isOpen).toBe(true);

      act(() => {
        result.current.close();
      });

      expect(result.current.isOpen).toBe(false);
    });
  });

  describe('appliedCount', () => {
    it('returns 0 when no filters are applied', () => {
      const mockFilter = {
        value: 20,
        isApplied: false,
        save: jest.fn(),
      };

      const { result } = renderHook(() => useFilters({ filters: [mockFilter] }));

      expect(result.current.appliedCount).toBe(0);
    });

    it('returns 1 when one filter is applied', () => {
      const mockFilter = {
        value: 50,
        isApplied: true,
        save: jest.fn(),
      };

      const { result } = renderHook(() => useFilters({ filters: [mockFilter] }));

      expect(result.current.appliedCount).toBe(1);
    });

    it('counts multiple applied filters correctly', () => {
      const filters = [
        { value: 50, isApplied: true, save: jest.fn() },
        { value: 'large', isApplied: true, save: jest.fn() },
        { value: 'beagle', isApplied: false, save: jest.fn() },
      ];

      const { result } = renderHook(() => useFilters({ filters }));

      expect(result.current.appliedCount).toBe(2);
    });

    it('updates count reactively when filter state changes', () => {
      let isApplied = false;

      const mockFilter = {
        get isApplied() {
          return isApplied;
        },
        value: 50,
        save: jest.fn(),
      };

      const { result, rerender } = renderHook(() => useFilters({ filters: [mockFilter] }));

      expect(result.current.appliedCount).toBe(0);

      isApplied = true;
      rerender({});

      expect(result.current.appliedCount).toBe(1);
    });
  });

  describe('apply', () => {
    it('calls save on all filters', async () => {
      const mockSave1 = jest.fn().mockResolvedValue(undefined);
      const mockSave2 = jest.fn().mockResolvedValue(undefined);
      const mockSave3 = jest.fn().mockResolvedValue(undefined);

      const filters = [
        { value: 50, isApplied: true, save: mockSave1 },
        { value: 'large', isApplied: true, save: mockSave2 },
        { value: 'beagle', isApplied: false, save: mockSave3 },
      ];

      const { result } = renderHook(() => useFilters({ filters }));

      await act(async () => {
        await result.current.apply();
      });

      expect(mockSave1).toHaveBeenCalledTimes(1);
      expect(mockSave2).toHaveBeenCalledTimes(1);
      expect(mockSave3).toHaveBeenCalledTimes(1);
    });

    it('calls save methods in parallel', async () => {
      const saveOrder: number[] = [];
      const mockSave1 = jest.fn(async () => {
        await new Promise((resolve) => setTimeout(resolve, 50));
        saveOrder.push(1);
      });
      const mockSave2 = jest.fn(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
        saveOrder.push(2);
      });

      const filters = [
        { value: 50, isApplied: true, save: mockSave1 },
        { value: 'large', isApplied: true, save: mockSave2 },
      ];

      const { result } = renderHook(() => useFilters({ filters }));

      await act(async () => {
        await result.current.apply();
      });

      expect(saveOrder).toEqual([2, 1]);
    });

    it('waits for all saves to complete before resolving', async () => {
      const mockSave1 = jest.fn().mockResolvedValue(undefined);
      const mockSave2 = jest.fn(async () => {
        await new Promise((resolve) => setTimeout(resolve, 100));
      });

      const filters = [
        { value: 50, isApplied: true, save: mockSave1 },
        { value: 'large', isApplied: true, save: mockSave2 },
      ];

      const { result } = renderHook(() => useFilters({ filters }));

      let applyFinished = false;

      const applyPromise = act(async () => {
        await result.current.apply();
        applyFinished = true;
      });

      expect(applyFinished).toBe(false);

      await applyPromise;

      expect(applyFinished).toBe(true);
      expect(mockSave1).toHaveBeenCalled();
      expect(mockSave2).toHaveBeenCalled();
    });

    it('handles save errors gracefully', async () => {
      const mockSave1 = jest.fn().mockResolvedValue(undefined);
      const mockSave2 = jest.fn().mockRejectedValue(new Error('Save failed'));

      const filters = [
        { value: 50, isApplied: true, save: mockSave1 },
        { value: 'large', isApplied: true, save: mockSave2 },
      ];

      const { result } = renderHook(() => useFilters({ filters }));

      await expect(
        act(async () => {
          await result.current.apply();
        })
      ).rejects.toThrow('Save failed');

      expect(mockSave1).toHaveBeenCalled();
      expect(mockSave2).toHaveBeenCalled();
    });
  });

  describe('empty filters array', () => {
    it('handles empty filters array gracefully', () => {
      const { result } = renderHook(() => useFilters({ filters: [] }));

      expect(result.current.appliedCount).toBe(0);
    });

    it('apply completes immediately with empty filters', async () => {
      const { result } = renderHook(() => useFilters({ filters: [] }));

      await act(async () => {
        await result.current.apply();
      });

      expect(result.current.appliedCount).toBe(0);
    });
  });
});
