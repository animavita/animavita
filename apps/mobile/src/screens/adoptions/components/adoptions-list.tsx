import { AdoptionType } from '@animavita/types';
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

/**
 * This component it is tied to AdoptionsList, when there is no
 * adoption registered yet, so I decided to keep it here
 */
const EmptyList = () => (
  <Box height="xl" flexDir="row" justifyContent="center" alignItems="center" color="primary.300">
    <Heading color="primary.200" size="sm">
      No adoptions registered yet!
    </Heading>
  </Box>
);
