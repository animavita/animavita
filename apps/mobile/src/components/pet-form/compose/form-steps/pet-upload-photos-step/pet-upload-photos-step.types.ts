import { IBoxProps } from 'native-base';

export type PhotoPickerProps = {
  imageUri?: string;
  small?: boolean;
  onPress?: () => void;
  hasError?: boolean;
  alt?: string;
  accessibilityHint?: string;
} & Pick<IBoxProps, 'marginLeft' | 'marginBottom' | 'marginTop'>;
