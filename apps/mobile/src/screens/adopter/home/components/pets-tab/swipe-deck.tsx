import React from 'react';
import { SharedValue } from 'react-native-reanimated';

import { TinderCard } from './card';

import { PetNearMeResponse } from '@/services/pets';

export type SwipeDeckProps = {
  cards: PetNearMeResponse[];
  swipeProgress: SharedValue<number>;
  onSwipeComplete: (cardId: string, direction: 'left' | 'right') => void;
};

export const SwipeDeck = ({ cards, swipeProgress, onSwipeComplete }: SwipeDeckProps) => {
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
