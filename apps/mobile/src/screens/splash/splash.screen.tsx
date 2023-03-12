import { View, Spinner } from 'native-base';

const SplashScreen = () => {
  return (
    <View flex="1" alignItems="center" justifyContent="center">
      <Spinner size="lg" />
    </View>
  );
};

export default SplashScreen;
