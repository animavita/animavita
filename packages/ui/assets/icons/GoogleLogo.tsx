import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Image, Platform, ViewProps} from 'react-native';

import GoogleLogoBinaries from './binaries/GoogleLogo.png';

function GoogleLogoSvg() {
  return (
    <Svg width="20.924" height="21.347" viewBox="0 0 20.924 21.347">
      <Path
        fill="#4285f4"
        d="M282.351 225.269a12.553 12.553 0 00-.184-2.169H272.1v4.11h5.765a4.94 4.94 0 01-2.133 3.243v2.667h3.439a10.424 10.424 0 003.18-7.851z"
        data-name="Caminho 144"
        transform="translate(.05 .018) translate(-261.477 -214.368)"
      />
      <Path
        fill="#34a853"
        d="M38.438 332.928a10.217 10.217 0 007.075-2.577l-3.439-2.667a6.473 6.473 0 01-9.624-3.384H28.9v2.749a10.674 10.674 0 009.538 5.879z"
        data-name="Caminho 145"
        transform="translate(.05 .018) translate(-27.815 -311.599)"
      />
      <Path
        fill="#fbbc04"
        d="M4.631 156.836a6.393 6.393 0 010-4.086V150H1.085a10.682 10.682 0 000 9.585z"
        data-name="Caminho 146"
        transform="translate(.05 .018) translate(0 -144.135)"
      />
      <Path
        fill="#ea4335"
        d="M38.438 4.206a5.8 5.8 0 014.094 1.6l3.047-3.047a10.258 10.258 0 00-7.141-2.777A10.671 10.671 0 0028.9 5.865l3.545 2.749a6.384 6.384 0 015.993-4.408z"
        data-name="Caminho 147"
        transform="translate(.05 .018) translate(-27.815)"
      />
    </Svg>
  );
}

const GoogleLogo: React.FC<ViewProps> = props => {
  if (Platform.OS === 'web') {
    // @ts-ignore
    return <GoogleLogoSvg {...props} />;
  } else {
    // @ts-ignore
    return <Image source={GoogleLogoBinaries} {...props} />;
  }
};

export default GoogleLogo;
