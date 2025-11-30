import Illustration from '@assets/pet-hug-illustration.png';
import { Button, Heading, View, Image, useToast } from 'native-base';
import { useState } from 'react';
import { Trans } from 'react-i18next';

import SafeArea from '@/components/safe-area/safe-area';
import AppStatusBar from '@/components/status-bar/status-bar.component';
import useLocale from '@/hooks/use-locale';
import useProfile from '@/hooks/use-profile';
import useUserRegister from '@/hooks/use-user-register';
import useNextOnboardingScreen from '@/navigation/hooks/use-next-onboarding-screen';
import { useNavigation } from '@/navigation/use-navigation';

type Role = 'adopter' | 'owner';

const RoleSelectionScreen = () => {
  const { firstName } = useProfile();
  const { saveRole, isSavingRole, user } = useUserRegister();
  const { t } = useLocale();
  const toast = useToast();
  const [role, setRole] = useState<Role | null>(null);
  const navigation = useNavigation();
  const getNextOnboardingScreen = useNextOnboardingScreen();

  const handleRoleSelection = (selectedRole: Role) => {
    setRole(selectedRole);
  };

  const getVariant = (buttonRole: Role) => {
    if (role === buttonRole) {
      return 'solid';
    }
    return 'outline';
  };

  const handleContinue = async () => {
    if (!role) return;

    try {
      await saveRole(role);
      if (!user) throw new Error('User not found after saving role');
      navigation.navigate(getNextOnboardingScreen({ ...user, role }));
    } catch {
      toast.show({
        description: t('ERRORS.GENERIC'),
      });
    }
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

        <Button
          variant="ghost"
          marginY="2"
          isDisabled={!role}
          onPress={handleContinue}
          isLoading={isSavingRole}
          isLoadingText={t('ROLE_SELECTION.CONTINUE_BUTTON')}
        >
          {t('ROLE_SELECTION.CONTINUE_BUTTON')}
        </Button>
      </SafeArea>
    </View>
  );
};

export default RoleSelectionScreen;
