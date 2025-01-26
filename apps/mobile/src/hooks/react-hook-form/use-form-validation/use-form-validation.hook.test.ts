import { act, renderHook } from '@testing-library/react-native';
import { TFunction } from 'i18next';
import { useToast } from 'native-base';
import { useFormContext } from 'react-hook-form';

import useFormValidation, { mountErrorMessage } from './use-form-validation.hook';

import useLocale from '@/hooks/use-locale';

jest.mock('@/hooks/use-locale');
jest.mock('native-base');
jest.mock('react-hook-form');

// eslint-disable-next-line react-hooks/rules-of-hooks
const setup = () => useFormValidation('adoption', 'REGISTER_ADOPTION.FORM_ERROR_MESSAGES');

const useLocaleReturnedValue: { t: TFunction<'translation', undefined> } = {
  // @ts-ignore
  t: (key: string) => key,
};

describe('mountErrorMessage', () => {
  it('returns error message', () => {
    expect(mountErrorMessage('name', 'any.required')).toBe('NAME_REQUIRED');
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
          getFieldState: () => {
            return { error: { type: 'any.required' } as Record<string, any> } as any;
          },
        });

        const { result } = renderHook(setup);

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
            errors: { name: { type: 'any.required' } } as Record<string, any>,
          } as any,
        });

        const { result } = renderHook(setup);

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
            getFieldState: () => {
              return { error: { type: 'any.required' } as Record<string, any> } as any;
            },
          });

          const { result } = renderHook(setup);

          await act(async () => {
            await result.current.validateField('name');
          });

          expect(show).toBeCalledWith({
            description: 'REGISTER_ADOPTION.FORM_ERROR_MESSAGES.NAME_REQUIRED',
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
            getFieldState: () => {
              return { error: { type: 'any.required' } as Record<string, any> } as any;
            },
          });

          const { result } = renderHook(setup);

          await act(async () => {
            await result.current.validateField('name');
          });

          expect(show).not.toBeCalled();
        });
      });
    });
  });
});
