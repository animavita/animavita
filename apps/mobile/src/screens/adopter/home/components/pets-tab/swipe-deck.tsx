import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { SharedValue } from 'react-native-reanimated';

import { TinderCard, TinderCardRef } from './card';

import { PetNearMeResponse } from '@/services/pets';

export type SwipeDeckProps = {
  cards: PetNearMeResponse[];
  swipeProgress: SharedValue<number>;
  onSwipeComplete: (cardId: string, direction: 'left' | 'right') => void;
};

export type SwipeDeckRef = {
  swipeLeft: () => void;
  swipeRight: () => void;
};

export const SwipeDeck = forwardRef<SwipeDeckRef, SwipeDeckProps>(
  ({ cards, swipeProgress, onSwipeComplete }, ref) => {
    const activeCardRef = useRef<TinderCardRef>(null);

    useImperativeHandle(ref, () => ({
      swipeLeft: () => {
        activeCardRef.current?.swipeLeft();
      },
      swipeRight: () => {
        activeCardRef.current?.swipeRight();
      },
    }));

    return (
      <>
        {cards.map((card, index) => {
          const isActive = index === cards.length - 1;
          return (
            <TinderCard
              key={card.id}
              ref={isActive ? activeCardRef : null}
              image={card.photos[0]}
              name={card.name}
              age={card.maturity}
              size={card.size}
              isActive={isActive}
              swipeProgress={swipeProgress}
              onSwipeComplete={(direction) => onSwipeComplete(card.id, direction)}
            />
          );
        })}
      </>
    );
  }
);
