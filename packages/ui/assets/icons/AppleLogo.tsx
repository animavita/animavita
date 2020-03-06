import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Image, Platform, ViewProps} from 'react-native';
import {useTheme} from '@animavita/theme';

import AppleWhiteLogoBinaries from './binaries/AppleWhiteLogo.png';
import AppleBlackLogoBinaries from './binaries/AppleBlackLogo.png';

function AppleLogoSvg() {
  const {themeName} = useTheme();
  return (
    <Svg width="20.772" height="24.66" viewBox="0 0 20.772 24.66">
      <Path
        fill={themeName === 'light' ? '#000' : '#fff'}
        d="M20.336 19.218a13.407 13.407 0 01-1.325 2.382 12.111 12.111 0 01-1.711 2.066 3.313 3.313 0 01-2.195.967 5.5 5.5 0 01-2.028-.484 5.818 5.818 0 00-2.183-.483 6.015 6.015 0 00-2.245.483 6.039 6.039 0 01-1.94.51 3.119 3.119 0 01-2.245-.992 12.717 12.717 0 01-1.786-2.137 14.781 14.781 0 01-1.885-3.753A13.739 13.739 0 010 13.3a8.166 8.166 0 011.072-4.268 6.291 6.291 0 012.246-2.271A6.042 6.042 0 016.355 5.9a7.15 7.15 0 012.345.55 7.55 7.55 0 001.866.55 11.147 11.147 0 002.066-.645 6.828 6.828 0 012.808-.5 5.962 5.962 0 014.67 2.459 5.2 5.2 0 00-2.755 4.719 5.206 5.206 0 001.709 3.923 5.617 5.617 0 001.708 1.12q-.206.595-.436 1.142zM15.578.494a5.261 5.261 0 01-1.349 3.451 4.6 4.6 0 01-3.816 1.884 3.839 3.839 0 01-.029-.467 5.405 5.405 0 011.431-3.487 5.508 5.508 0 011.743-1.31A5.2 5.2 0 0115.552 0a4.479 4.479 0 01.026.493z"
        transform="translate(0 -.001)"
      />
    </Svg>
  );
}

const AppleLogo: React.FC<ViewProps> = props => {
  const {themeName} = useTheme();
  if (Platform.OS === 'web') {
    // @ts-ignore
    return <AppleLogoSvg {...props} />;
  } else {
    // @ts-ignore
    return <Image source={themeName === 'light' ? AppleBlackLogoBinaries : AppleWhiteLogoBinaries} {...props} />;
  }
};

export default AppleLogo;
