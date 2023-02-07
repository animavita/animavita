import { useTranslation } from 'react-i18next';

const useLocale = () => {
  const { t } = useTranslation();

  return {
    t: (key: string) => t(key) || 'Error',
  };
};

export default useLocale;
