import { Ionicons } from '@expo/vector-icons';
import { Center, Icon, Text } from 'native-base';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  withTiming,
  SharedValue,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';

import useLocale from '@/hooks/use-locale';

export type EmptyStateProps = {
  hasPets: boolean;
  swipeProgress: SharedValue<number>;
  isLastCard: boolean;
};

export const EmptyState = ({ hasPets, swipeProgress, isLastCard }: EmptyStateProps) => {
  const { t } = useLocale();

  const animatedStyle = useAnimatedStyle(() => {
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
