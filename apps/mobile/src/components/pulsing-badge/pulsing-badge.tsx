import { Box } from 'native-base';
import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

type PulsingBadgeProps = {
  show: boolean;
};

export const PulsingBadge = ({ show }: PulsingBadgeProps) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  useEffect(() => {
    if (show) {
      scale.value = withRepeat(
        withTiming(1.3, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        -1,
        true
      );
      opacity.value = withRepeat(
        withTiming(0.5, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        -1,
        true
      );
    } else {
      scale.value = 1;
      opacity.value = 1;
    }
  }, [show, scale, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  if (!show) return null;

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          top: -4,
          right: -8,
        },
        animatedStyle,
      ]}
    >
      <Box width={2} height={2} borderRadius="full" bg="red.500" />
    </Animated.View>
  );
};
