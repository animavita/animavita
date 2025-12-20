import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { Box, Button, Icon, View, Text, Center, Skeleton } from 'native-base';
import React, { useState, useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  SharedValue,
  interpolate,
  Extrapolation,
  withRepeat,
  Easing,
} from 'react-native-reanimated';

import { TinderCard } from './card';
import { SearchRadius } from './filters/search-radius';
import { FiltersModal } from './filters-modal';
import { FiltersTrigger } from './filters-trigger';
import { useFilters } from '../../hooks/use-filters';
import { useSearchRadius } from '../../hooks/use-search-radius';

import { Delimiter } from '@/components/delimiter/delimiter';
import useLocale from '@/hooks/use-locale';
import { getPetsNearMe, PetNearMeResponse } from '@/services/pets';

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

  const [cards, setCards] = useState<PetNearMeResponse[] | null>(null);

  React.useEffect(() => {
    if (!isLoading) {
      setCards(pets);
    }
  }, [pets, isLoading]);

  const handleSwipeComplete = (cardId: string, direction: 'left' | 'right') => {
    console.log(`Card ${cardId} swiped ${direction}`);
    setCards((prevCards) => (prevCards || []).filter((card) => card.id !== cardId));
  };

  const renderContent = () => {
    if (cards === null) {
      return <LoadingState />;
    }

    if (error) {
      return <ErrorState onRetry={() => refetch()} />;
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
          <CardsList
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

type CardsListProps = {
  cards: PetNearMeResponse[];
  swipeProgress: SharedValue<number>;
  onSwipeComplete: (cardId: string, direction: 'left' | 'right') => void;
};

const CardsList = ({ cards, swipeProgress, onSwipeComplete }: CardsListProps) => {
  return (
    <>
      {cards.map((card, index) => (
        <TinderCard
          key={card.id}
          image={card.photos[0]}
          name={card.name}
          age={card.maturity}
          size={card.size}
          isActive={index === cards.length - 1}
          swipeProgress={swipeProgress}
          onSwipeComplete={(direction) => onSwipeComplete(card.id, direction)}
        />
      ))}
    </>
  );
};

type EmptyStateProps = {
  hasPets: boolean;
  swipeProgress: SharedValue<number>;
  isLastCard: boolean;
};

const EmptyState = ({ hasPets, swipeProgress, isLastCard }: EmptyStateProps) => {
  const { t } = useLocale();

  const animatedStyle = useAnimatedStyle(() => {
    // Fade in when it's the last card being swiped, stay visible when no cards left
    // Map swipeProgress (0-1) to opacity (0-0.4) for a subtle fade
    const opacity = isLastCard
      ? interpolate(swipeProgress.value, [0, 1], [0, 0.4], Extrapolation.CLAMP)
      : 1;

    return {
      opacity: withTiming(opacity, { duration: 200 }),
    };
  });

  return (
    <Animated.View style={[{ flex: 1 }, animatedStyle]}>
      <Center flex="1" paddingX="6">
        <Icon as={Ionicons} name="paw" size="64px" color="gray.400" mb="4" />
        <Text fontSize="xl" fontWeight="bold" color="gray.600" textAlign="center" mb="2">
          {hasPets ? t('HOME.NO_MORE_PETS') : t('HOME.NO_PETS_NEARBY')}
        </Text>
        <Text fontSize="md" color="gray.500" textAlign="center">
          {hasPets ? t('HOME.NO_MORE_PETS_DESCRIPTION') : t('HOME.NO_PETS_NEARBY_DESCRIPTION')}
        </Text>
      </Center>
    </Animated.View>
  );
};

const LoadingState = () => {
  const { t } = useLocale();
  const shimmerOpacity = useSharedValue(0.3);

  useEffect(() => {
    shimmerOpacity.value = withRepeat(
      withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, [shimmerOpacity]);

  const shimmerStyle = useAnimatedStyle(() => ({
    opacity: shimmerOpacity.value,
  }));

  return (
    <Box
      position="absolute"
      height="100%"
      width="100%"
      borderRadius={8}
      overflow="hidden"
      bg="gray.100"
      accessibilityLabel={t('HOME.LOADING_PETS')}
    >
      <Animated.View style={[{ flex: 1 }, shimmerStyle]}>
        <Skeleton height="100%" borderRadius={8} startColor="gray.200" endColor="gray.300" />
      </Animated.View>
      <Box position="absolute" bottom={0} left={0} right={0} p={5}>
        <Skeleton.Text lines={1} mb={2} w="60%" />
        <Skeleton.Text lines={1} w="40%" />
      </Box>
    </Box>
  );
};

const ErrorState = ({ onRetry }: { onRetry: () => void }) => {
  const { t } = useLocale();

  return (
    <Center flex="1" paddingX="6">
      <Icon as={Ionicons} name="alert-circle-outline" size="64px" color="red.400" mb="4" />
      <Text fontSize="xl" fontWeight="bold" color="gray.600" textAlign="center" mb="2">
        {t('ERRORS.GENERIC')}
      </Text>
      <Text fontSize="md" color="gray.500" textAlign="center" mb="4">
        {t('ERRORS.LOAD_PETS_ERROR')}
      </Text>
      <Button
        variant="solid"
        colorScheme="primary"
        leftIcon={<Icon as={Ionicons} name="refresh" />}
        onPress={onRetry}
      >
        {t('ERRORS.RETRY_BUTTON')}
      </Button>
    </Center>
  );
};
