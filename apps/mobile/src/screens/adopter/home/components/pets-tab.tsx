import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { Badge, Box, Button, Icon, View, VStack, Text, Center } from 'native-base';
import React, { useState } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  SharedValue,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';

import { TinderCard } from './card';

import { Delimiter } from '@/components/delimiter/delimiter';
import useLocale from '@/hooks/use-locale';
import { getPetsNearMe, PetNearMeResponse } from '@/services/pets';

const PetsTab = () => {
  const { t } = useLocale();
  const swipeProgress = useSharedValue(0);

  const { data: pets = [], isLoading } = useQuery({
    queryKey: ['pets', 'nearMe'],
    queryFn: async () => {
      const response = await getPetsNearMe(20);
      return response.data;
    },
  });

  const [cards, setCards] = useState(pets);

  React.useEffect(() => {
    if (pets.length > 0) {
      setCards(pets);
    }
  }, [pets]);

  const handleSwipeComplete = (cardId: string, direction: 'left' | 'right') => {
    console.log(`Card ${cardId} swiped ${direction}`);
    setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
  };

  const renderContent = () => {
    if (isLoading) {
      return null;
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

type CardsListProps = {
  cards: PetNearMeResponse[];
  swipeProgress: any;
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
