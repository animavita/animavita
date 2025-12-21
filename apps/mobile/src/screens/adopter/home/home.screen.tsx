import FavoritesTab from './components/favorites-tab';
import PetsTab from './components/pets-tab/pets-tab';
import RequestsTab from './components/requests-tab';

import TabsComponent from '@/components/tabs';
import useLocale from '@/hooks/use-locale';

const AdopterHome = () => {
  const { t } = useLocale();

  return (
    <TabsComponent
      tabs={[
        {
          key: 'pets',
          title: t('HOME.PETS'),
          component: PetsTab,
        },
        {
          key: 'favorites',
          title: t('HOME.FAVORITES'),
          component: FavoritesTab,
        },
        {
          key: 'requests',
          title: t('HOME.REQUESTS'),
          component: RequestsTab,
        },
      ]}
    />
  );
};

export default AdopterHome;
