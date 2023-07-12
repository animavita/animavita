import { Button } from 'native-base';

import Delimiter from '../../components/delimiter/delimiter';
import SafeArea from '../../components/safe-area/safe-area';
import Topbar from '../../components/topbar/topbar';
import { useAuth } from '../../hooks/use-auth-provider';

const ProfileScreen = () => {
  const { signOut } = useAuth();

  return (
    <SafeArea>
      <Topbar />
      <Delimiter flex="1">
        <Button
          variant="solid"
          onPress={() => {
            signOut();
          }}
          marginTop="auto"
        >
          Sair
        </Button>
      </Delimiter>
    </SafeArea>
  );
};

export default ProfileScreen;
