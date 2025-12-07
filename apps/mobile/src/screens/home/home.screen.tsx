import { Box, Heading, Avatar, Pressable } from 'native-base';

import AdopterHome from '../adopter/home/home.screen';
import OwnerHome from '../owner/home/home.screen';

import { Delimiter } from '@/components/delimiter/delimiter';
import SafeArea from '@/components/safe-area/safe-area';
import useLocale from '@/hooks/use-locale';
import useProfile from '@/hooks/use-profile/use-profile';
import { useNavigation } from '@/navigation/use-navigation';

const Home = () => {
  const { firstName, initials, isAdopter, isOwner } = useProfile();
  const { navigate } = useNavigation();
  const { t } = useLocale();

  const content = (() => {
    if (isAdopter) {
      return <AdopterHome />;
    }
    if (isOwner) {
      return <OwnerHome />;
    }
  })();

  return (
    <SafeArea>
      <Delimiter>
        <Pressable onPress={() => navigate('Profile')}>
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
      </Delimiter>

      {content}
    </SafeArea>
  );
};

export default Home;
