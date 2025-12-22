import { Box, Skeleton, VStack, HStack } from 'native-base';
import React from 'react';

import useLocale from '@/hooks/use-locale';

export const LoadingState = () => {
  const { t } = useLocale();

  return (
    <Box flex={1} px={4} pt={4}>
      <VStack space={3} accessibilityLabel={t('HOME.LOADING_PETS')}>
        {[1, 2, 3, 4, 5].map((index) => (
          <Box
            key={index}
            bg="white"
            borderRadius="xl"
            shadow={2}
            overflow="hidden"
            borderWidth={1}
            borderColor="coolGray.200"
          >
            <HStack space={3} p={3}>
              <Box>
                <Skeleton w="24" h="24" borderRadius="lg" />
              </Box>

              <VStack flex={1} space={1} justifyContent="center">
                {/* Pet name - fontSize lg */}
                <Skeleton.Text lines={1} w="60%" fontSize="lg" />

                {/* Badge + breed - HStack with alignItems center */}
                <HStack space={2} alignItems="center">
                  <Skeleton h={5} w={12} borderRadius="md" />
                  <Skeleton.Text lines={1} w="40%" />
                </HStack>

                {/* Icons row with mt={1} */}
                <HStack space={2} mt={1}>
                  <Skeleton.Text lines={1} w="20%" />
                  <Skeleton.Text lines={1} w="20%" />
                  <Skeleton.Text lines={1} w="20%" />
                </HStack>
              </VStack>

              <VStack space={2} justifyContent="center">
                <Skeleton w={10} h={10} borderRadius="lg" />
                <Skeleton w={10} h={10} borderRadius="lg" />
              </VStack>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};
