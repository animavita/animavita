import { Dimensions, Image } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS as scheduleOnRN,
} from 'react-native-reanimated';

const { width } = Dimensions.get('screen');

const SWIPE_THRESHOLD = width * 0.5;

type TinderCardProps = {
  image: string;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
};

export const TinderCard = ({ image, onSwipeLeft, onSwipeRight }: TinderCardProps) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const prevTranslationX = useSharedValue(0);
  const prevTranslationY = useSharedValue(0);
  const rotate = useSharedValue(0);

  const PanGesture = Gesture.Pan()
    .onStart((event) => {
      prevTranslationX.value = event.translationX;
      prevTranslationY.value = event.translationY;
    })
    .onUpdate((event) => {
      const isSwipingLeft = translateX.value < 0;
      const up = prevTranslationY.value + event.translationX / 5;

      translateX.value = prevTranslationX.value + event.translationX;
      translateY.value = isSwipingLeft ? up : up * -1;
      rotate.value = (event.translationX / 30) * -1;
    })
    .onEnd(() => {
      if (translateX.value > SWIPE_THRESHOLD) {
        translateX.value = withTiming(width * 2, { duration: 400 });
        scheduleOnRN(onSwipeRight);
      } else if (translateX.value < -SWIPE_THRESHOLD) {
        translateX.value = withTiming(-width * 2, { duration: 400 });
        scheduleOnRN(onSwipeLeft);
      } else {
        translateX.value = withTiming(0);
        translateY.value = withTiming(0);
        rotate.value = withTiming(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate.value}deg` },
      ],
    };
  });

  return (
    <GestureDetector gesture={PanGesture}>
      <Animated.View
        style={[
          {
            position: 'absolute',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
          },
          animatedStyle,
        ]}
      >
        <Image
          source={{ uri: image }}
          style={{
            height: '100%',
            width: '100%',
            borderRadius: 8,
          }}
        />
      </Animated.View>
    </GestureDetector>
  );
};
