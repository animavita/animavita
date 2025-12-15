import { Dimensions, Image } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Extrapolation,
  SharedValue,
} from 'react-native-reanimated';

const { width } = Dimensions.get('screen');
const SWIPE_THRESHOLD = width * 0.5;
const INACTIVE_SCALE = 0.92;

type TinderCardProps = {
  image: string;
  isActive: boolean;
  swipeProgress: SharedValue<number>;
  onSwipeComplete: (direction: 'left' | 'right') => void;
};

export const TinderCard = ({
  image,
  isActive,
  swipeProgress,
  onSwipeComplete,
}: TinderCardProps) => {
  // Animation values for the card's position and rotation
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);

  // Pan gesture to handle card swiping
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      // Move the card with the gesture
      translateX.value = event.translationX;
      // Y translation moves in opposite direction based on swipe direction
      const isSwipingLeft = event.translationX < 0;
      translateY.value = isSwipingLeft ? event.translationX / 5 : (event.translationX / 5) * -1;
      rotate.value = (event.translationX / 30) * -1;

      // Update swipe progress so cards behind can scale up
      swipeProgress.value = Math.abs(event.translationX) / SWIPE_THRESHOLD;
    })
    .onEnd(() => {
      const swipedRight = translateX.value > SWIPE_THRESHOLD;
      const swipedLeft = translateX.value < -SWIPE_THRESHOLD;

      if (swipedRight || swipedLeft) {
        // Animate card off screen
        const direction = swipedRight ? 1 : -1;
        translateX.value = withTiming(direction * width * 2, { duration: 400 });
        swipeProgress.value = withTiming(1, { duration: 400 }, (finished) => {
          if (finished) {
            // Trigger callback on JS thread when animation completes
            runOnJS(onSwipeComplete)(swipedRight ? 'right' : 'left');
          }
        });
      } else {
        // Snap back to center if swipe was too short
        translateX.value = withTiming(0);
        translateY.value = withTiming(0);
        rotate.value = withTiming(0);
        swipeProgress.value = withTiming(0);
      }
    });

  // Animated styles for the card
  const animatedStyle = useAnimatedStyle(() => {
    // Active card is full size (1.0), inactive cards scale from 0.92 to 1.0 as active card swipes
    const scale = isActive
      ? 1
      : interpolate(swipeProgress.value, [0, 1], [INACTIVE_SCALE, 1], Extrapolation.CLAMP);

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate.value}deg` },
        { scale },
      ],
    };
  });

  const cardStyle = {
    position: 'absolute' as const,
    height: '100%' as const,
    width: '100%' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    borderRadius: 8,
  };

  const imageStyle = {
    height: '100%' as const,
    width: '100%' as const,
    borderRadius: 8,
  };

  // Inactive cards: no gesture detector, pass touches through with pointerEvents="none"
  if (!isActive) {
    return (
      <Animated.View pointerEvents="none" style={[cardStyle, animatedStyle]}>
        <Image source={{ uri: image }} style={imageStyle} />
      </Animated.View>
    );
  }

  // Active card: wrapped with gesture detector to enable swiping
  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[cardStyle, animatedStyle]}>
        <Image source={{ uri: image }} style={imageStyle} />
      </Animated.View>
    </GestureDetector>
  );
};
