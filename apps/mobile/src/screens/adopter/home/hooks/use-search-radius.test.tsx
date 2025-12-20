import AsyncStorage from '@react-native-async-storage/async-storage';
import { renderHook, waitFor, act } from '@testing-library/react-native';

import { useSearchRadius } from './use-search-radius';

describe('useSearchRadius', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    AsyncStorage.clear();
  });

  describe('initial state', () => {
    it('returns default radius of 20 when no saved value exists', async () => {
      const { result } = renderHook(() => useSearchRadius());

      expect(result.current.radius).toBe(20);
      expect(result.current.isFiltersOpen).toBe(false);
    });

    it('loads saved radius from AsyncStorage on mount', async () => {
      await AsyncStorage.setItem('searchRadius', JSON.stringify(50));

      const { result } = renderHook(() => useSearchRadius());

      await waitFor(() => {
        expect(result.current.radius).toBe(50);
      });
    });

    it('uses default radius when AsyncStorage returns null', async () => {
      await AsyncStorage.removeItem('searchRadius');

      const { result } = renderHook(() => useSearchRadius());

      await waitFor(() => {
        expect(result.current.radius).toBe(20);
      });
    });

    it('handles AsyncStorage errors gracefully', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      jest.spyOn(AsyncStorage, 'getItem').mockRejectedValueOnce(new Error('Storage error'));

      const { result } = renderHook(() => useSearchRadius());

      await waitFor(() => {
        expect(result.current.radius).toBe(20);
      });

      expect(consoleErrorSpy).toHaveBeenCalled();
      consoleErrorSpy.mockRestore();
    });
  });

  describe('filter modal controls', () => {
    it('opens filters when openFilters is called', () => {
      const { result } = renderHook(() => useSearchRadius());

      expect(result.current.isFiltersOpen).toBe(false);

      act(() => {
        result.current.openFilters();
      });

      expect(result.current.isFiltersOpen).toBe(true);
    });

    it('closes filters when closeFilters is called', () => {
      const { result } = renderHook(() => useSearchRadius());

      act(() => {
        result.current.openFilters();
      });
      expect(result.current.isFiltersOpen).toBe(true);

      act(() => {
        result.current.closeFilters();
      });

      expect(result.current.isFiltersOpen).toBe(false);
    });
  });

  describe('applying filters', () => {
    it('updates radius and persists to AsyncStorage when onApply is called', async () => {
      const { result } = renderHook(() => useSearchRadius());

      await act(async () => {
        await result.current.onApply(75);
      });

      expect(result.current.radius).toBe(75);

      const savedValue = await AsyncStorage.getItem('searchRadius');
      expect(JSON.parse(savedValue!)).toBe(75);
    });

    it('updates radius even if AsyncStorage fails', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      jest.spyOn(AsyncStorage, 'setItem').mockRejectedValueOnce(new Error('Storage full'));

      const { result } = renderHook(() => useSearchRadius());

      await act(async () => {
        await result.current.onApply(60);
      });

      expect(result.current.radius).toBe(60);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('Failed to save'),
        expect.any(Error)
      );

      consoleErrorSpy.mockRestore();
    });

    it('persists multiple radius changes correctly', async () => {
      const { result } = renderHook(() => useSearchRadius());

      await act(async () => {
        await result.current.onApply(30);
      });
      expect(result.current.radius).toBe(30);

      await act(async () => {
        await result.current.onApply(90);
      });
      expect(result.current.radius).toBe(90);

      const savedValue = await AsyncStorage.getItem('searchRadius');
      expect(JSON.parse(savedValue!)).toBe(90);
    });
  });

  describe('integration with AsyncStorage', () => {
    it('loads previously saved radius on subsequent hook initializations', async () => {
      const { result: firstResult } = renderHook(() => useSearchRadius());

      await act(async () => {
        await firstResult.current.onApply(45);
      });

      expect(firstResult.current.radius).toBe(45);

      // Create a new hook instance to simulate app restart
      const { result: secondResult } = renderHook(() => useSearchRadius());

      await waitFor(() => {
        expect(secondResult.current.radius).toBe(45);
      });
    });
  });
});
