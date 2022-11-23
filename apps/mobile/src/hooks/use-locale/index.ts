import { useTranslation } from "react-i18next";

export default function useLocale() {
  const { t } = useTranslation();

  return {
    t: (key: string) => t(key) || "Error",
  };
}
