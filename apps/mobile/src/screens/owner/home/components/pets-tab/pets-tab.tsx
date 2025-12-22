import { Ionicons } from '@expo/vector-icons';
import { Box, Fab, Icon } from 'native-base';
import React from 'react';
import { FlatList } from 'react-native';

import { EmptyState } from './empty-state';
import { ErrorState } from './error-state';
import { LoadingState } from './loading-state';

import useLocale from '@/hooks/use-locale';
import usePets from '@/hooks/use-pets/use-pets';
import { useNavigation } from '@/navigation/use-navigation';
import { AdoptionCard } from '@/screens/adoptions/compose/adoption-card';

const PetsTab = () => {
  const navigation = useNavigation();
  const { t } = useLocale();
  const { myPets, loading, error, refetch } = usePets();

  const renderContent = () => {
    if (error) {
      return <ErrorState onRetry={() => refetch()} />;
    }

    if (loading) {
      return <LoadingState />;
    }

    if (myPets.length <= 0) {
      return <EmptyState />;
    }

    return (
      <FlatList
        renderItem={({ item }) => <AdoptionCard {...item} />}
        data={myPets}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={() => <Box h={3} />}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 80 }}
      />
    );
  };

  return (
    <Box flex={1}>
      {renderContent()}

      <Fab
        renderInPortal={false}
        shadow={2}
        size="sm"
        icon={<Icon color="white" as={Ionicons} name="add" size="md" />}
        placement="bottom-right"
        onPress={() => {
          navigation.navigate('RegisterPet');
        }}
        aria-label={t('HOME.REGISTER_ADOPTION')}
        right={2}
        bottom={2}
      />
    </Box>
  );
};

export default PetsTab;
