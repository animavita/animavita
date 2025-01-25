import { Ionicons } from '@expo/vector-icons';
import { Button, FlatList, Icon, Pressable, Text } from 'native-base';

import Delimiter from '@/components/delimiter/delimiter';
import SafeArea from '@/components/safe-area/safe-area';
import Topbar from '@/components/topbar/topbar';
import { useAuth } from '@/hooks/use-auth-provider';
import useLocale from '@/hooks/use-locale';
import { StackParamsList } from '@/navigation/main-navigator';
import { useNavigation } from '@/navigation/use-navigation';

const ProfileScreen = () => {
  const { signOut } = useAuth();
  const { t } = useLocale();

  const { navigate } = useNavigation();

  return (
    <SafeArea>
      <Delimiter flex="1">
        <Topbar />
        <FlatList
          mt={4}
          data={PROFILE_ROUTES}
          keyExtractor={({ name }) => `app-route-${name}`}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => navigate(item.path as never)}
              flexDirection="row"
              alignItems="center"
              mb={2}
            >
              <Icon as={Ionicons} name="paw" size="lg" color="primary.300" />
              <Text color="primary.300" ml={3}>
                {t(item.translationKey)}
              </Text>
            </Pressable>
          )}
        />
        <Button
          variant="solid"
          onPress={() => {
            signOut();
          }}
          marginTop="auto"
        >
          {t('PROFILE.LOGOUT')}
        </Button>
      </Delimiter>
    </SafeArea>
  );
};

const PROFILE_ROUTES: { name: string; translationKey: string; path: keyof StackParamsList }[] = [
  {
    name: 'my-pets',
    translationKey: 'MY_PETS_SCREEN.TITLE',
    path: 'MyPets',
  },
];

export default ProfileScreen;
