import { Ionicons } from '@expo/vector-icons';
import { Badge, Box, Button, Icon, View, VStack } from 'native-base';
import React, { useState } from 'react';

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

  const onSwipeLeft = (id: number) => {
    setTimeout(() => {
      setCards((old) => old.filter((card) => card.id !== id));
    }, 300);
  };
  const onSwipeRight = (id: number) => {
    setTimeout(() => {
      setCards((old) => old.filter((card) => card.id !== id));
    }, 300);
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
      <View flex="1" marginX="6">
        {cards.map((card) => (
          <TinderCard
            key={card.id}
            {...card}
            onSwipeLeft={() => onSwipeLeft(card.id)}
            onSwipeRight={() => onSwipeRight(card.id)}
          />
        ))}
      </View>
    </Box>
  );
};

export default PetsTab;
