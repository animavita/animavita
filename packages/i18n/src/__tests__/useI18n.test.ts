import {renderHook} from '@testing-library/react-hooks';

import {useI18n} from '../useI18n';
import {I18nProvider} from '../Controller';

describe('useI18n hook', () => {
  describe('using single namespace', () => {
    it('translates correctly', () => {
      const {result} = renderHook(() => useI18n(['tab_bar']), {wrapper: I18nProvider});

      const translation = result.current.t('pages.adoptions');
      expect(translation).toEqual('adoções');
    });

    it('translation not found', () => {
      const {result} = renderHook(() => useI18n(['tab_bar']), {wrapper: I18nProvider});

      const translation = result.current.t('some_random_label');
      expect(translation).toEqual('Translation not found');
    });
  });

  describe('using multiple namespaces', () => {
    it('translates correctly', () => {
      const {result} = renderHook(() => useI18n(['home', 'tab_bar']), {wrapper: I18nProvider});

      const translation = result.current.t('options.settings');
      expect(translation).toEqual('Configurações');
    });

    it('translation not found', () => {
      const {result} = renderHook(() => useI18n(['home', 'tab_bar']), {wrapper: I18nProvider});

      const translation = result.current.t('some_random_label');
      expect(translation).toEqual('Translation not found');
    });
  });

  it('passing options to translate', () => {
    const {result} = renderHook(() => useI18n(['tab_bar']), {wrapper: I18nProvider});

    const translation = result.current.t('greetings', {name: 'User'});
    expect(translation).toEqual('Olá, User!');
  });
});
