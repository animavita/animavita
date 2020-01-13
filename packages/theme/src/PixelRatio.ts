import {Dimensions, PixelRatio} from 'react-native';

export const widthPercentageToDP = (widthPercent: string) => {
  const screenWidth = Dimensions.get('window').width;
  return PixelRatio.roundToNearestPixel((screenWidth * parseFloat(widthPercent)) / 100);
};

export const heightPercentageToDP = (heightPercent: string) => {
  const screenHeight = Dimensions.get('window').height;
  return PixelRatio.roundToNearestPixel((screenHeight * parseFloat(heightPercent)) / 100);
};

export const px2ddp = PixelRatio.getPixelSizeForLayoutSize;
