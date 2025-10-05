import { Button, Box, Text, VStack, useToast } from 'native-base';
import React, { useState } from 'react';

import AppStatusBar from '@/components/status-bar/status-bar.component';
import useLocale from '@/hooks/use-locale';
import useUserRegister from '@/hooks/use-user-register';
import { useNavigation } from '@/navigation/use-navigation';

const RoleSelectionScreen = () => {
  const { t } = useLocale();
  const { complete, error } = useUserRegister();
  const { navigate } = useNavigation();
  const toast = useToast();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelection = async (role: string) => {
    setSelectedRole(role);
    setIsLoading(true);

    try {
      await complete({ role });
      navigate('GeoLocation');
    } catch (err) {
      toast.show({
        description: error || 'Erro ao definir sua função!',
        status: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box flex="1" padding={8}>
      <AppStatusBar />
      
      <VStack space={6} flex={1} justifyContent="center" alignItems="center">
        <Text fontSize="2xl" fontWeight="bold" textAlign="center">
          {t('ROLE_SELECTION.TITLE')}
        </Text>
        
        <Text fontSize="md" textAlign="center" color="gray.600">
          {t('ROLE_SELECTION.SUBTITLE')}
        </Text>

        <VStack space={4} width="full" maxWidth="300px">
          <Button
            size="lg"
            onPress={() => handleRoleSelection('adopter')}
            isLoading={isLoading && selectedRole === 'adopter'}
            disabled={isLoading}
            variant={selectedRole === 'adopter' ? 'solid' : 'outline'}
          >
            {t('ROLE_SELECTION.ADOPTER')}
          </Button>

          <Button
            size="lg"
            onPress={() => handleRoleSelection('owner')}
            isLoading={isLoading && selectedRole === 'owner'}
            disabled={isLoading}
            variant={selectedRole === 'owner' ? 'solid' : 'outline'}
          >
            {t('ROLE_SELECTION.OWNER')}
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};

export default RoleSelectionScreen;