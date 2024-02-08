import { AdoptionType } from '@animavita/types';
import { Box, Heading, View } from 'native-base';
import { FlatList } from 'react-native';

import { AdoptionCard } from './adoption-card';

import useLocale from '@/hooks/use-locale';

type Adoption = AdoptionType & {
  id: string;
};

type MyPetsListProps = {
  adoptions: Adoption[];
};

export const MyPetsList = ({ adoptions }: MyPetsListProps) => {
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
