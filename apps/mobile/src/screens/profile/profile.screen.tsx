import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Button, FlatList, Icon, Pressable, Text } from 'native-base';

import Delimiter from '@/components/delimiter/delimiter';
import SafeArea from '@/components/safe-area/safe-area';
import Topbar from '@/components/topbar/topbar';
import { useAuth } from '@/hooks/use-auth-provider';
import useLocale from '@/hooks/use-locale';
import Routes from '@/routes';

const ProfileScreen = () => {
  const { signOut } = useAuth();
  const { t } = useLocale();

  const { navigate } = useNavigation();

  return (
    <SafeArea>
      <Delimiter flex="1">
        <Topbar />
        <FlatList
          data={PROFILE_ROUTES}
          keyExtractor={({ name }) => `app-route-${name}`}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => navigate(item.path as never)}
              flexDirection="row"
              alignItems="center"
              mt={3}
              py={4}
              px={2}
            >
              <Icon as={Ionicons} name="paw" size="lg" color="primary.300" />
              <Text color="primary.300" ml={3}>
                {t(item.translateKey)}
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

const PROFILE_ROUTES = [
  {
    name: 'my-adoptions',
    translateKey: 'MY_PETS_SCREEN.TITLE',
    path: Routes.MyAdoptions,
  },
];

export default ProfileScreen;
