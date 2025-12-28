import { useState } from 'react';

import FavoritesTab from './components/favorites-tab';
import PetsTab from './components/pets-tab/pets-tab';
import RequestsTab from './components/requests-tab';

import TabsComponent from '@/components/tabs';
import { NewRequestsProvider, useNewRequests } from '@/contexts/new-requests-context';
import useLocale from '@/hooks/use-locale';

const AdopterHomeContent = () => {
  const { t } = useLocale();
  const { setHasNewRequests } = useNewRequests();
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (index: number) => {
    setCurrentTab(index);
    // Clear badge when user views requests tab (index 2)
    if (index === 2) {
      setHasNewRequests(false);
    }
  };

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
      onIndexChange={handleTabChange}
    />
  );
};

const AdopterHome = () => {
  return (
    <NewRequestsProvider>
      <AdopterHomeContent />
    </NewRequestsProvider>
  );
};

export default AdopterHome;
