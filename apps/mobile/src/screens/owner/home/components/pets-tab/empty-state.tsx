import { Ionicons } from '@expo/vector-icons';
import { Box, Center, Heading, Icon, Text, VStack } from 'native-base';
import React from 'react';

import useLocale from '@/hooks/use-locale';

export const EmptyState = () => {
  const { t } = useLocale();

  return (
    <Box flex={1} bg="white">
      <Center flex={1} px={8}>
        <VStack space={4} alignItems="center">
          <Box bg="primary.50" p={6} borderRadius="full">
            <Icon as={Ionicons} name="paw-outline" size="4xl" color="primary.300" />
          </Box>
          <VStack space={2} alignItems="center">
            <Heading size="md" color="coolGray.600" textAlign="center">
              {t('MY_PETS_SCREEN.EMPTY_LIST')}
            </Heading>
            <Text color="coolGray.400" textAlign="center" fontSize="sm">
              {t('MY_PETS_SCREEN.EMPTY_LIST_DESCRIPTION') ||
                'Tap the + button to post your first pet for adoption'}
            </Text>
          </VStack>
        </VStack>
      </Center>
    </Box>
  );
};
