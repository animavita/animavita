import { AdoptionType } from '@animavita/types';
import { t } from 'i18next';
import { Box, Heading, View } from 'native-base';
import { FlatList } from 'react-native';

import { AdoptionCard } from './adoption-card';

type Adoption = AdoptionType & {
  id: string;
};

type AdoptionsListProps = {
  adoptions: Adoption[];
};

export const AdoptionsList = ({ adoptions }: AdoptionsListProps) => {
  if (adoptions.length <= 0) return <EmptyList />;

  return (
    <FlatList
      renderItem={({ item }) => <AdoptionCard {...item} />}
      data={adoptions}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={() => <View h={4} />}
    />
  );
};

const EmptyList = () => (
  <Box height="xl" flexDir="row" justifyContent="center" alignItems="center" color="primary.300">
    <Heading color="primary.200" size="sm">
      {t('MY_PETS_SCREEN.EMPTY_LIST')}
    </Heading>
  </Box>
);
