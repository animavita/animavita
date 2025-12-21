import { Ionicons } from '@expo/vector-icons';
import { Center, Icon, Text, Button } from 'native-base';
import React from 'react';

import useLocale from '@/hooks/use-locale';

export const ErrorState = ({ onRetry }: { onRetry: () => void }) => {
  const { t } = useLocale();

  return (
    <Center flex="1" paddingX="6">
      <Icon as={Ionicons} name="alert-circle-outline" size="64px" color="red.400" mb="4" />
      <Text fontSize="xl" fontWeight="bold" color="gray.600" textAlign="center" mb="2">
        {t('ERRORS.GENERIC')}
      </Text>
      <Text fontSize="md" color="gray.500" textAlign="center" mb="4">
        {t('ERRORS.LOAD_PETS_ERROR')}
      </Text>
      <Button
        variant="solid"
        colorScheme="primary"
        leftIcon={<Icon as={Ionicons} name="refresh" />}
        onPress={onRetry}
      >
        {t('ERRORS.RETRY_BUTTON')}
      </Button>
    </Center>
  );
};
