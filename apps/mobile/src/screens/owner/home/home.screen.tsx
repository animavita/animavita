import PetsTab from './components/pets-tab/pets-tab';
import RequestsTab from './components/requests-tab';

import TabsComponent from '@/components/tabs';
import useLocale from '@/hooks/use-locale';

const OwnerHome = () => {
  const { t } = useLocale();

  return (
    <TabsComponent
      tabs={[
        {
          key: 'my-pets',
          title: t('MY_PETS_SCREEN.TITLE'),
          component: PetsTab,
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

export default OwnerHome;
