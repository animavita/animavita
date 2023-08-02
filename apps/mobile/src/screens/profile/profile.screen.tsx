import { Button } from 'native-base';

import Delimiter from '../../components/delimiter/delimiter';
import SafeArea from '../../components/safe-area/safe-area';
import Topbar from '../../components/topbar/topbar';
import { useAuth } from '../../hooks/use-auth-provider';
import useLocale from '../../hooks/use-locale';

const ProfileScreen = () => {
  const { signOut } = useAuth();
  const { t } = useLocale();

  return (
    <SafeArea>
      <Delimiter flex="1">
        <Topbar />
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

export default ProfileScreen;
