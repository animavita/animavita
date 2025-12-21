import { Box, Skeleton } from 'native-base';
import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
} from 'react-native-reanimated';

import useLocale from '@/hooks/use-locale';

export const LoadingState = () => {
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
