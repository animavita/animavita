import { StatusBar } from 'native-base';

import theme from '../../../theme';

export default function AppStatusBar() {
  return <StatusBar barStyle="dark-content" backgroundColor={theme.colors.white} />;
}
