import { StatusBar } from 'native-base';

import theme from '../../../theme';

const AppStatusBar = () => {
  return <StatusBar barStyle="dark-content" backgroundColor={theme.colors.white} />;
};

export default AppStatusBar;
