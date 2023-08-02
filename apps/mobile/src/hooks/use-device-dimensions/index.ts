import { Dimensions } from 'react-native';

const useDeviceDimensions = () => {
  const { width, height } = Dimensions.get('window');

  return { deviceWidth: width, deviceHeight: height };
};

export default useDeviceDimensions;
