import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { Badge, Box, Button, Icon, View, VStack, Text, Center, Skeleton } from 'native-base';
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

import { Delimiter } from '@/components/delimiter/delimiter';
import useLocale from '@/hooks/use-locale';
import { getPetsNearMe, PetNearMeResponse } from '@/services/pets';

const PetsTab = () => {
  const { t } = useLocale();
  const swipeProgress = useSharedValue(0);

  const {
    data: pets = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['pets', 'nearMe'],
    queryFn: async () => {
      const response = await getPetsNearMe(20);
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
          <VStack>
            <Badge
              colorScheme="orange"
              rounded="full"
              mb={-4}
              mr={-4}
              zIndex={1}
              variant="solid"
              alignSelf="flex-end"
              _text={{
                fontSize: 12,
              }}
            >
              2
            </Badge>
            <Button variant="solid" size="sm" leftIcon={<Icon as={Ionicons} name="filter" />}>
              {t('HOME.FILTER')}
            </Button>
          </VStack>
        </Box>
      </Delimiter>
      <View flex="1" marginX="6" _web={{ marginBottom: 4 }}>
        {renderContent()}
      </View>
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
          age={card.age}
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
