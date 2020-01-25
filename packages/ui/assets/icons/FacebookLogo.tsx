import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Image, Platform, ViewProps} from 'react-native';

function FacebookLogoSvg() {
  return (
    <Svg width="10.782" height="19.942" viewBox="0 0 10.782 19.942">
      <Path
        fill="#fff"
        d="M32.453 0h-2.586a4.541 4.541 0 00-4.783 4.908V7.17h-2.6a.407.407 0 00-.407.407v3.279a.407.407 0 00.407.407h2.6v8.273a.406.406 0 00.407.407h3.392a.407.407 0 00.407-.407v-8.274h3.04a.406.406 0 00.407-.407V7.577a.407.407 0 00-.407-.407h-3.041V5.252c0-.922.22-1.39 1.421-1.39h1.742a.407.407 0 00.406-.407V.411A.407.407 0 0032.453 0z"
        data-name="Caminho 143"
        transform="translate(-22.077)"
      />
    </Svg>
  );
}

import FacebookLogoBinaries from './binaries/FacebookLogo.png';

const FacebookLogo: React.FC<ViewProps> = props => {
  if (Platform.OS === 'web') {
    // @ts-ignore
    return <FacebookLogoSvg {...props} />;
  } else {
    // @ts-ignore
    return <Image source={FacebookLogoBinaries} {...props} />;
  }
};

export default FacebookLogo;
