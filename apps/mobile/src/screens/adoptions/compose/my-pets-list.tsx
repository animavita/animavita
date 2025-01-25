import { AdoptionType } from '@animavita/types';
import { Box, Heading, Text, Spacer } from 'native-base';
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
      ItemSeparatorComponent={() => <Spacer size={4} />}
      ListHeaderComponent={
        <>
          <Topbar />
          <Box mt={4} mb={6}>
            <Heading size="xl" color="primary.500">
              {t('MY_PETS_SCREEN.TITLE')}
            </Heading>
            <Text mt={1} color="coolGray.500">
              {t('MY_PETS_SCREEN.SUB_TITLE')}
            </Text>
          </Box>
        </>
      }
    />
  );
};

const EmptyList = () => {
  const { t } = useLocale();
  return (
    <Box height="xl" flexDir="row" justifyContent="center" alignItems="center" color="primary.300">
      <Heading color="primary.200" size="sm">
        {t('MY_PETS_SCREEN.EMPTY_LIST')}
      </Heading>
    </Box>
  );
};
