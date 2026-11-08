import { registerRootComponent } from 'expo';
import { LogBox } from 'react-native';

import App from './App';

// Dev warning toasts sit on top of the UI and swallow taps in Maestro e2e runs.
// `pnpm e2e debug:metro` sets EXPO_PUBLIC_E2E=true (see e2e/README.md).
if (process.env.EXPO_PUBLIC_E2E === 'true') {
  LogBox.ignoreAllLogs();
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
