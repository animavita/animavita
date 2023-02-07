import { act, renderHook } from '@testing-library/react-hooks';
import { useToast } from 'native-base';
import { useFormContext } from 'react-hook-form';
import useLocale from '../../shared/hooks/use-locale';

import { mountErrorMessage, useFormValidation } from './adoption-form.hooks';

jest.mock('../../shared/hooks/use-locale');
jest.mock('native-base');
jest.mock('react-hook-form');

const useLocaleReturnedValue = { t: (key: string) => key };

describe('mountErrorMessage', () => {
  it('returns error message', () => {
    expect(mountErrorMessage('name', 'string.empty')).toBe('NAME_STRING_EMPTY');
  });
});

describe('useFormValidation', () => {
  beforeEach(jest.clearAllMocks);

  describe('when validateField is called', () => {
    describe('when field is valid', () => {
      it('returns validateField as true', async () => {
        jest.mocked(useLocale).mockReturnValue(useLocaleReturnedValue);
        jest
          .mocked(useToast)
          .mockReturnValue({ ...useToast(), show: jest.fn(), isActive: jest.fn() });
        jest.mocked(useFormContext).mockReturnValue({
          ...useFormContext(),
          trigger: () => Promise.resolve(true),
          formState: {
            errors: { name: { type: 'string.empty' } } as Record<string, any>,
          } as any,
        });

        const { result } = renderHook(() => useFormValidation());

        await act(async () => {
          const isValid = await result.current.validateField('name');
          expect(isValid).toBeTruthy();
        });
      });
    });

    describe('when field is invalid', () => {
      it('returns validateField as false', async () => {
        jest.mocked(useLocale).mockReturnValue(useLocaleReturnedValue);
        jest
          .mocked(useToast)
          .mockReturnValue({ ...useToast(), show: jest.fn(), isActive: jest.fn() });
        jest.mocked(useFormContext).mockReturnValue({
          ...useFormContext(),
          trigger: () => Promise.resolve(false),
          formState: {
            errors: { name: { type: 'string.empty' } } as Record<string, any>,
          } as any,
        });

        const { result } = renderHook(() => useFormValidation());

        await act(async () => {
          const isValid = await result.current.validateField('name');

          expect(isValid).toBeFalsy();
        });
      });

      describe('whe isActive returns false', () => {
        it('calls show toast', async () => {
          const show = jest.fn();

          jest.mocked(useLocale).mockReturnValue(useLocaleReturnedValue);
          jest.mocked(useToast).mockReturnValue({ ...useToast(), show, isActive: () => false });
          jest.mocked(useFormContext).mockReturnValue({
            ...useFormContext(),
            trigger: () => Promise.resolve(false),
            formState: {
              errors: { name: { type: 'string.empty' } } as Record<string, any>,
            } as any,
          });

          const { result } = renderHook(() => useFormValidation());

          await act(async () => {
            await result.current.validateField('name');
          });

          expect(show).toBeCalledWith({
            description: 'REGISTER_ADOPTION.FORM_ERROR_MESSAGES.NAME_STRING_EMPTY',
            id: 'adoption-form-toast',
          });
        });
      });

      describe('whe isActive returns true', () => {
        it('does calls show toast', async () => {
          const show = jest.fn();

          jest.mocked(useLocale).mockReturnValue(useLocaleReturnedValue);
          jest.mocked(useToast).mockReturnValue({ ...useToast(), show, isActive: () => true });
          jest.mocked(useFormContext).mockReturnValue({
            ...useFormContext(),
            trigger: () => Promise.resolve(false),
            formState: {
              errors: { name: { type: 'string.empty' } } as Record<string, any>,
            } as any,
          });

          const { result } = renderHook(() => useFormValidation());

          await act(async () => {
            await result.current.validateField('name');
          });

          expect(show).not.toBeCalled();
        });
      });
    });
  });
});
