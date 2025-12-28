import { useQuery } from '@tanstack/react-query';
import { Box, View } from 'native-base';
import React, { useRef, useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';

import { ActionButtons } from './action-buttons';
import { EmptyState } from './empty-state';
import { ErrorState } from './error-state';
import { SearchRadius } from './filters/search-radius';
import { FiltersModal } from './filters-modal';
import { FiltersTrigger } from './filters-trigger';
import { LoadingState } from './loading-state';
import { SwipeDeck, SwipeDeckRef } from './swipe-deck';
import { useAdoption } from '../../hooks/use-adoption';
import { useFilters } from '../../hooks/use-filters';
import { useSearchRadius } from '../../hooks/use-search-radius';

import { Delimiter } from '@/components/delimiter/delimiter';
import { getPetsNearMe } from '@/services/pets';
import { QUERY_KEYS } from '@/services/query-keys';

const PetsTab = () => {
  const swipeProgress = useSharedValue(0);
  const deckRef = useRef<SwipeDeckRef>(null);
  const searchRadius = useSearchRadius();
  const { isOpen, open, close, apply, appliedCount } = useFilters({ filters: [searchRadius] });

  const {
    data: pets = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEYS.petsNearMe, searchRadius.value],
    queryFn: async () => {
      const response = await getPetsNearMe(searchRadius.value);
      return response.data;
    },
  });

  const [swipedIds, setSwipedIds] = useState<Set<string>>(new Set());
  const cards = (pets || []).filter((p) => !swipedIds.has(p.id));
  const { pass, adopt, like } = useAdoption();

  const handleGestureSwipe = (cardId: string, direction: 'left' | 'right') => {
    if (direction === 'left') {
      pass(cardId);
    } else {
      like(cardId);
    }
  };

  const handleAnimationComplete = (cardId: string) => {
    setSwipedIds((prev) => {
      const next = new Set(prev);
      next.add(cardId);
      return next;
    });
  };

  const handlePass = () => {
    if (cards.length > 0) {
      const currentPet = cards[cards.length - 1];
      pass(currentPet.id);
      deckRef.current?.swipeLeft();
    }
  };

  const handleAdopt = () => {
    if (cards.length > 0) {
      const currentPet = cards[cards.length - 1];
      adopt(currentPet.id);
      deckRef.current?.swipeRight();
    }
  };

  const handleFavorite = () => {
    if (cards.length > 0) {
      const currentPet = cards[cards.length - 1];
      like(currentPet.id);
      deckRef.current?.swipeRight();
    }
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
            ref={deckRef}
            cards={cards}
            swipeProgress={swipeProgress}
            onGestureSwipe={handleGestureSwipe}
            onAnimationComplete={handleAnimationComplete}
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

      {!isLoading && !error && cards.length > 0 && (
        <Delimiter>
          <ActionButtons
            onPass={handlePass}
            onAdopt={handleAdopt}
            onFavorite={handleFavorite}
            disabled={cards.length === 0}
          />
        </Delimiter>
      )}

      <FiltersModal isOpen={isOpen} onClose={close} onApply={apply}>
        <SearchRadius currentRadius={searchRadius.value} onChange={searchRadius.change} />
      </FiltersModal>
    </Box>
  );
};

export default PetsTab;
