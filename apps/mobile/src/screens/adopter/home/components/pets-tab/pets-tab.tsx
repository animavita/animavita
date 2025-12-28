import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
import { useFilters } from '../../hooks/use-filters';
import { useSearchRadius } from '../../hooks/use-search-radius';

import { Delimiter } from '@/components/delimiter/delimiter';
import { requestPetAdoption } from '@/services/adoptions';
import { getPetsNearMe } from '@/services/pets';
import { QUERY_KEYS } from '@/services/query-keys';
import { useNewRequestsStore } from '@/state/requests/requests.store';

const PetsTab = () => {
  const swipeProgress = useSharedValue(0);
  const deckRef = useRef<SwipeDeckRef>(null);
  const searchRadius = useSearchRadius();
  const { isOpen, open, close, apply, appliedCount } = useFilters({ filters: [searchRadius] });
  const queryClient = useQueryClient();
  const setHasNewRequests = useNewRequestsStore((state) => state.setHasNewRequests);

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

  const adoptionMutation = useMutation({
    mutationFn: requestPetAdoption,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.getMyAdoptionRequests] });
      queryClient.invalidateQueries({ queryKey: ['pets', 'nearMe'] });
      setHasNewRequests(true);
    },
    onError: (error) => {
      console.error('Failed to request adoption:', error);
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

  const handlePass = () => {
    deckRef.current?.swipeLeft();
  };

  const handleAdopt = () => {
    deckRef.current?.swipeRight();
    // TODO: Trigger adoption request API call
  };

  const handleFavorite = () => {
    if (cards.length > 0) {
      const currentPet = cards[cards.length - 1];
      adoptionMutation.mutate(currentPet.id);
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
