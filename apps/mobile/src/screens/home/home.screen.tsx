import { useNavigation } from '@react-navigation/native';
import { Box, Heading, Avatar, Pressable } from 'native-base';

import AdoptionsTab from './components/adoptions-tab';
import FavoritesTab from './components/favorites-tab';
import RequestsTab from './components/requests-tab';
import Delimiter from '../../components/delimiter';
import SafeArea from '../../components/safe-area/safe-area';
import TabsComponent from '../../components/tabs';
import useLocale from '../../hooks/use-locale';
import useProfile from '../../hooks/use-profile/use-profile';
import Routes from '../../routes';

const Home = () => {
  const { firstName, initials } = useProfile();
  const { navigate } = useNavigation();
  const { t } = useLocale();

  return (
    <SafeArea>
      <Delimiter flex="1">
        <Pressable onPress={() => navigate(Routes.Profile)}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Heading size="md">{t('HOME.HELLO', { name: firstName })}</Heading>
            <Avatar size="sm">{initials}</Avatar>
          </Box>
        </Pressable>

        <Box marginTop="4" flex="1">
          <TabsComponent
            tabs={[
              {
                key: 'adoptions',
                title: t('HOME.ADOPTIONS'),
                component: AdoptionsTab,
              },
              {
                key: 'requests',
                title: t('HOME.REQUESTS'),
                component: RequestsTab,
              },
              { key: 'favorites', title: t('HOME.FAVORITES'), component: FavoritesTab },
            ]}
          />
        </Box>
      </Delimiter>
    </SafeArea>
  );
};

export default Home;
