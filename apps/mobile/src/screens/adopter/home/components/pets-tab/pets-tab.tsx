import { useQuery } from '@tanstack/react-query';
import { Box, View } from 'native-base';
import React, { useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';

import { EmptyState } from './empty-state';
import { ErrorState } from './error-state';
import { SearchRadius } from './filters/search-radius';
import { FiltersModal } from './filters-modal';
import { FiltersTrigger } from './filters-trigger';
import { LoadingState } from './loading-state';
import { SwipeDeck } from './swipe-deck';
import { useFilters } from '../../hooks/use-filters';
import { useSearchRadius } from '../../hooks/use-search-radius';

import { Delimiter } from '@/components/delimiter/delimiter';
import { getPetsNearMe } from '@/services/pets';

const PetsTab = () => {
  const swipeProgress = useSharedValue(0);
  const searchRadius = useSearchRadius();
  const { isOpen, open, close, apply, appliedCount } = useFilters({ filters: [searchRadius] });

  const {
    data: pets = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['pets', 'nearMe', searchRadius.value],
    queryFn: async () => {
      const response = await getPetsNearMe(searchRadius.value);
      return response.data;
    },
  });

  const [swipedIds, setSwipedIds] = useState<Set<string>>(new Set());
  const cards = (pets || []).filter((p) => !swipedIds.has(p.id));

  const handleSwipeComplete = (cardId: string, direction: 'left' | 'right') => {
    console.log(`Card ${cardId} swiped ${direction}`);
    setSwipedIds((prev) => {
      const next = new Set(prev);
      next.add(cardId);
      return next;
    });
  };

  const renderContent = () => {
    if (error) {
      return <ErrorState onRetry={() => refetch()} />;
    }

    if (isLoading) {
      return <LoadingState />;
    }

    const isLastCard = cards.length === 1;
    const showEmptyState = cards.length === 0 || isLastCard;

    return (
      <>
        {showEmptyState && (
          <EmptyState
            hasPets={pets.length > 0}
            swipeProgress={swipeProgress}
            isLastCard={isLastCard}
          />
        )}
        {cards.length > 0 && (
          <SwipeDeck
            cards={cards}
            swipeProgress={swipeProgress}
            onSwipeComplete={handleSwipeComplete}
          />
        )}
      </>
    );
  };

  return (
    <Box flex="1">
      <Delimiter>
        <Box marginY="4" display="flex" flexDirection="row" justifyContent="space-between">
          <FiltersTrigger onPress={open} appliedCount={appliedCount} />
        </Box>
      </Delimiter>

      <View flex="1" marginX="6" _web={{ marginBottom: 4 }}>
        {renderContent()}
      </View>

      <FiltersModal isOpen={isOpen} onClose={close} onApply={apply}>
        <SearchRadius currentRadius={searchRadius.value} onChange={searchRadius.change} />
      </FiltersModal>
    </Box>
  );
};

export default PetsTab;
