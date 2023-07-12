import React from 'react';

export type Children = React.ReactNode;

type ImageURI = string | undefined | null;

export type DevicePermissions = 'granted' | 'undetermined' | 'denied';

export interface ImagePicker {
  getPermissionStatus: () => Promise<DevicePermissions>;
  openImageLibrary: () => Promise<ImageURI>;
}

export type Props = {
  children: React.ReactNode;
};
