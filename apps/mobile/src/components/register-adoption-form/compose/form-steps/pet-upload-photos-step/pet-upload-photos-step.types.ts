import { IImageProps } from 'native-base';

export type PhotoPickerProps = {
  imageUri?: string;
  small?: boolean;
  onPress?: () => void;
} & IImageProps;

export type UsePetPhotosPickerHook = {
  images: string[];
  pickImage: (imageIndex: number) => () => void;
};
