import { Ionicons } from '@expo/vector-icons';
import { Badge, Box, Button, Icon, View, VStack } from 'native-base';
import React, { useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';

import { TinderCard } from './card';

import { Delimiter } from '@/components/delimiter/delimiter';
import useLocale from '@/hooks/use-locale';

const cardsData = [
  { id: 1, name: 'John Doe', image: 'https://picsum.photos/200/300' },
  { id: 2, name: 'Jane Doe', image: 'https://picsum.photos/200/300' },
  { id: 3, name: 'John Smith', image: 'https://picsum.photos/200/300' },
  { id: 4, name: 'John Doe', image: 'https://picsum.photos/200/300' },
  { id: 5, name: 'Jane Doe', image: 'https://picsum.photos/200/300' },
  { id: 6, name: 'John Smith', image: 'https://picsum.photos/200/300' },
  { id: 7, name: 'John Doe', image: 'https://picsum.photos/200/300' },
  { id: 8, name: 'Jane Doe', image: 'https://picsum.photos/200/300' },
  { id: 9, name: 'John Smith', image: 'https://picsum.photos/200/300' },
];

const PetsTab = () => {
  const { t } = useLocale();
  const [cards, setCards] = useState(cardsData);
  const swipeProgress = useSharedValue(0);

  const handleSwipeComplete = (cardId: number, direction: 'left' | 'right') => {
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
        {cards.map((card, index) => (
          <TinderCard
            key={card.id}
            image={card.image}
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
