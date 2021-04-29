import {useI18nController} from './Controller';

const useI18n = (namespaces: string[]) => {
  const context = useI18nController();

  const t = (key: string, options: object = {}) => {
    for (const namespace of namespaces) {
      const searchFor = `${namespace}.${key}`;
      const translation = context.t(searchFor, options);

      const notFound = `[missing "${context.locale}.${searchFor}" translation]`;
      if (translation !== notFound) return translation;
    }
    return 'Translation not found';
  };

  return {
    t,
  };
};

export {useI18n};
