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

      expect(result.current.value).toBe(20);
      expect(result.current.isApplied).toBe(false);
    });

    it('loads saved radius from AsyncStorage on mount', async () => {
      await AsyncStorage.setItem('searchRadius', JSON.stringify(50));

      const { result } = renderHook(() => useSearchRadius());

      await waitFor(() => {
        expect(result.current.value).toBe(50);
        expect(result.current.isApplied).toBe(true);
      });
    });

    it('uses default radius when AsyncStorage returns null', async () => {
      await AsyncStorage.removeItem('searchRadius');

      const { result } = renderHook(() => useSearchRadius());

      await waitFor(() => {
        expect(result.current.value).toBe(20);
      });
    });

    it('handles AsyncStorage errors gracefully', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      jest.spyOn(AsyncStorage, 'getItem').mockRejectedValueOnce(new Error('Storage error'));

      const { result } = renderHook(() => useSearchRadius());

      await waitFor(() => {
        expect(result.current.value).toBe(20);
      });

      expect(consoleErrorSpy).toHaveBeenCalled();
      consoleErrorSpy.mockRestore();
    });
  });

  describe('change and save', () => {
    it('updates draft value with change but does not trigger re-render', () => {
      const { result } = renderHook(() => useSearchRadius());

      act(() => {
        result.current.change(75);
      });

      expect(result.current.value).toBe(20);
    });

    it('persists draft value when save is called', async () => {
      const { result } = renderHook(() => useSearchRadius());

      act(() => {
        result.current.change(75);
      });

      await act(async () => {
        await result.current.save();
      });

      expect(result.current.value).toBe(75);
      expect(result.current.isApplied).toBe(true);

      const savedValue = await AsyncStorage.getItem('searchRadius');
      expect(JSON.parse(savedValue!)).toBe(75);
    });

    it('saves even if AsyncStorage fails', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      jest.spyOn(AsyncStorage, 'setItem').mockRejectedValueOnce(new Error('Storage full'));

      const { result } = renderHook(() => useSearchRadius());

      act(() => {
        result.current.change(60);
      });

      await act(async () => {
        await result.current.save();
      });

      expect(result.current.value).toBe(60);
      expect(result.current.isApplied).toBe(true);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        expect.stringContaining('Failed to save'),
        expect.any(Error)
      );

      consoleErrorSpy.mockRestore();
    });

    it('persists multiple draft and save cycles correctly', async () => {
      const { result } = renderHook(() => useSearchRadius());

      act(() => {
        result.current.change(30);
      });
      await act(async () => {
        await result.current.save();
      });
      expect(result.current.value).toBe(30);
      expect(result.current.isApplied).toBe(true);

      act(() => {
        result.current.change(90);
      });
      await act(async () => {
        await result.current.save();
      });
      expect(result.current.value).toBe(90);
      expect(result.current.isApplied).toBe(true);

      const savedValue = await AsyncStorage.getItem('searchRadius');
      expect(JSON.parse(savedValue!)).toBe(90);
    });
  });

  describe('integration with AsyncStorage', () => {
    it('loads previously saved radius on subsequent hook initializations', async () => {
      const { result: firstResult } = renderHook(() => useSearchRadius());

      act(() => {
        firstResult.current.change(45);
      });
      await act(async () => {
        await firstResult.current.save();
      });

      expect(firstResult.current.value).toBe(45);

      const { result: secondResult } = renderHook(() => useSearchRadius());

      await waitFor(() => {
        expect(secondResult.current.value).toBe(45);
        expect(secondResult.current.isApplied).toBe(true);
      });
    });
  });

  describe('isApplied', () => {
    it('returns false when radius is at default value', () => {
      const { result } = renderHook(() => useSearchRadius());

      expect(result.current.isApplied).toBe(false);
    });

    it('returns true when radius differs from default', async () => {
      const { result } = renderHook(() => useSearchRadius());

      act(() => {
        result.current.change(50);
      });
      await act(async () => {
        await result.current.save();
      });

      expect(result.current.isApplied).toBe(true);
    });

    it('returns false when radius is reset to default', async () => {
      const { result } = renderHook(() => useSearchRadius());

      act(() => {
        result.current.change(50);
      });
      await act(async () => {
        await result.current.save();
      });
      expect(result.current.isApplied).toBe(true);

      act(() => {
        result.current.change(20);
      });
      await act(async () => {
        await result.current.save();
      });
      expect(result.current.isApplied).toBe(false);
    });
  });

  describe('draft state behavior', () => {
    it('allows multiple changes before saving', () => {
      const { result } = renderHook(() => useSearchRadius());

      act(() => {
        result.current.change(30);
        result.current.change(40);
        result.current.change(50);
      });

      expect(result.current.value).toBe(20);
    });

    it('saves the latest draft value', async () => {
      const { result } = renderHook(() => useSearchRadius());

      act(() => {
        result.current.change(30);
        result.current.change(40);
        result.current.change(50);
      });

      await act(async () => {
        await result.current.save();
      });

      expect(result.current.value).toBe(50);
    });

    it('preserves draft state after initial load completes', async () => {
      await AsyncStorage.setItem('searchRadius', JSON.stringify(30));

      const { result } = renderHook(() => useSearchRadius());

      await waitFor(() => {
        expect(result.current.value).toBe(30);
      });

      act(() => {
        result.current.change(60);
      });

      expect(result.current.value).toBe(30);

      await act(async () => {
        await result.current.save();
      });

      expect(result.current.value).toBe(60);
    });
  });
});
