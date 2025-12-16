import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { Badge, Box, Button, Icon, View, VStack } from 'native-base';
import React, { useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';

import { TinderCard } from './card';

import { Delimiter } from '@/components/delimiter/delimiter';
import useLocale from '@/hooks/use-locale';
import { getPetsNearMe } from '@/services/pets';

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
        {isLoading
          ? null
          : cards.map((card, index) => (
              <TinderCard
                key={card.id}
                image={card.photos[0]}
                name={card.name}
                age={card.age}
                size={card.size}
                isActive={index === cards.length - 1}
                swipeProgress={swipeProgress}
                onSwipeComplete={(direction) => handleSwipeComplete(card.id, direction)}
              />
            ))}
      </View>
    </Box>
  );
};

export default PetsTab;
