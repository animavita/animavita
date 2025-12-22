import { AdoptionType } from '@animavita/types';
import { Ionicons } from '@expo/vector-icons';
import { Box, Heading, Text, VStack, Icon, Center } from 'native-base';
import React from 'react';
import { FlatList } from 'react-native';

import { AdoptionCard } from './adoption-card';

import Topbar from '@/components/topbar';
import useLocale from '@/hooks/use-locale';

export type Adoption = AdoptionType & {
  id: string;
};

type MyPetsListProps = {
  pets: Adoption[];
};

export const MyPetsList = ({ pets }: MyPetsListProps) => {
  const { t } = useLocale();

  if (pets.length <= 0) return <EmptyList />;

  return (
    <FlatList
      renderItem={({ item }) => <AdoptionCard {...item} />}
      data={pets}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={() => <Box h={3} />}
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 80 }}
      ListHeaderComponent={
        <>
          <Topbar />
          <VStack mt={4} mb={6} space={1}>
            <Heading size="xl" color="primary.600">
              {t('MY_PETS_SCREEN.TITLE')}
            </Heading>
            <Text color="coolGray.500" fontSize="md">
              {t('MY_PETS_SCREEN.SUB_TITLE')}
            </Text>
          </VStack>
        </>
      }
    />
  );
};

const EmptyList = () => {
  const { t } = useLocale();
  return (
    <Box flex={1} bg="white">
      <Box px={4}>
        <Topbar />
        <VStack mt={4} mb={6} space={1}>
          <Heading size="xl" color="primary.600">
            {t('MY_PETS_SCREEN.TITLE')}
          </Heading>
          <Text color="coolGray.500" fontSize="md">
            {t('MY_PETS_SCREEN.SUB_TITLE')}
          </Text>
        </VStack>
      </Box>

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
