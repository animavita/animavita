import * as ExpoImagePicker from 'expo-image-picker';

import { ImagePicker } from './types';

export const makeImagePicker = (imagePickerExternalLib = ExpoImagePicker): ImagePicker => ({
  getPermissionStatus: async () => {
    const { status } = await imagePickerExternalLib.getMediaLibraryPermissionsAsync();

    return status;
  },

  openImageLibrary: async () => {
    const image = await imagePickerExternalLib.launchImageLibraryAsync({
      mediaTypes: imagePickerExternalLib.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!image.canceled && image.assets) return image.assets[0].uri;
  },
});

const imagePickerUtil = makeImagePicker();

export default imagePickerUtil;
