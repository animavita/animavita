import FavoritesTab from './components/favorites-tab';
import PetsTab from './components/pets-tab/pets-tab';
import RequestsTab from './components/requests-tab';

import TabsComponent from '@/components/tabs';
import useLocale from '@/hooks/use-locale';
import { useNewRequestsStore } from '@/state/requests/requests.store';

const AdopterHome = () => {
  const { t } = useLocale();
  const hasNewRequests = useNewRequestsStore((state) => state.hasNewRequests);
  const setHasNewRequests = useNewRequestsStore((state) => state.setHasNewRequests);

  const tabs = [
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
  ];

  const handleTabChange = (index: number) => {
    const selectedTab = tabs[index];
    if (selectedTab?.key === 'requests') {
      setHasNewRequests(false);
    }
  };

  return (
    <TabsComponent
      tabs={tabs}
      badgeConfig={{
        tabKey: 'requests',
        shouldShow: (focused) => !focused && hasNewRequests,
      }}
      onIndexChange={handleTabChange}
    />
  );
};

export default AdopterHome;
