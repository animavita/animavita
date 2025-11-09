import Illustration from '@assets/pet-hug-illustration.png';
import { Button, Heading, View, Image } from 'native-base';
import { useState } from 'react';
import { Trans } from 'react-i18next';

import SafeArea from '@/components/safe-area/safe-area';
import AppStatusBar from '@/components/status-bar/status-bar.component';
import useLocale from '@/hooks/use-locale';
import useProfile from '@/hooks/use-profile';
import { useNavigation } from '@/navigation/use-navigation';

type Role = 'adopter' | 'owner';

const RoleSelectionScreen = () => {
  const { firstName } = useProfile();
  const { t } = useLocale();
  const [role, setRole] = useState<Role | null>(null);
  const navigation = useNavigation();

  const handleRoleSelection = (selectedRole: Role) => {
    setRole(selectedRole);
  };

  const getVariant = (buttonRole: Role) => {
    if (role === buttonRole) {
      return 'solid';
    }
    return 'outline';
  };

  const handleContinue = () => {
    navigation.navigate('GeoLocation');
  };

  return (
    <View flex="1" padding={8} alignItems="center">
      <AppStatusBar />

      <SafeArea>
        <View width={300} _web={{ width: 'full' }}>
          <Heading fontSize={35}>
            <Trans
              i18nKey="ROLE_SELECTION.GREETINGS"
              values={{ name: firstName }}
              components={{
                highlight: <Heading color="primary.500" fontSize={35} />,
              }}
            />
          </Heading>
        </View>

        <Image
          source={Illustration}
          resizeMode="contain"
          flex="1"
          alt={t('ROLE_SELECTION.IMAGE_ALT_TEXT')}
          alignSelf="center"
        />

        <Button
          variant={getVariant('adopter')}
          marginY="2"
          onPress={() => handleRoleSelection('adopter')}
          aria-selected={role === 'adopter'}
        >
          {t('ROLE_SELECTION.ADOPTER_OPTION')}
        </Button>
        <Button
          variant={getVariant('owner')}
          marginY="2"
          onPress={() => handleRoleSelection('owner')}
          aria-selected={role === 'owner'}
        >
          {t('ROLE_SELECTION.OWNER_OPTION')}
        </Button>

        <Button variant="ghost" marginY="2" isDisabled={!role} onPress={handleContinue}>
          {t('ROLE_SELECTION.CONTINUE_BUTTON')}
        </Button>
      </SafeArea>
    </View>
  );
};

export default RoleSelectionScreen;
