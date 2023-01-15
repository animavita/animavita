import { Dimensions } from 'react-native';

export default function useDeviceDimensions() {
  const { width, height } = Dimensions.get('window');

  return { deviceWidth: width, deviceHeight: height };
}
