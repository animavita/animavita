import { useTranslation } from 'react-i18next';

const useLocale = () => {
  const { t } = useTranslation();

  return {
    t,
  };
};

export default useLocale;
