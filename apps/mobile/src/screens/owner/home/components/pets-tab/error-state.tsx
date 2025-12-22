import { Ionicons } from '@expo/vector-icons';
import { Center, Icon, Text, Button, VStack } from 'native-base';
import React from 'react';

import useLocale from '@/hooks/use-locale';

export const ErrorState = ({ onRetry }: { onRetry: () => void }) => {
  const { t } = useLocale();

  return (
    <Center flex={1} px={6}>
      <VStack space={4} alignItems="center">
        <Icon as={Ionicons} name="alert-circle-outline" size="4xl" color="red.400" />
        <VStack space={2} alignItems="center">
          <Text fontSize="xl" fontWeight="bold" color="gray.600" textAlign="center">
            {t('ERRORS.GENERIC')}
          </Text>
          <Text fontSize="md" color="gray.500" textAlign="center">
            {t('ERRORS.LOAD_PETS_ERROR')}
          </Text>
        </VStack>
        <Button
          variant="solid"
          colorScheme="primary"
          leftIcon={<Icon as={Ionicons} name="refresh" />}
          onPress={onRetry}
        >
          {t('ERRORS.RETRY_BUTTON')}
        </Button>
      </VStack>
    </Center>
  );
};
