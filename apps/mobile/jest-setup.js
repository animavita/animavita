import { server } from './src/test/msw/server';

// https://github.com/callstack/react-native-paper/issues/4561
jest.mock('expo-font');

jest.mock('posthog-react-native', () => ({
  useFeatureFlag: jest.fn(),
}));

// Mock AsyncStorage for tests
// https://react-native-async-storage.github.io/async-storage/docs/advanced/jest
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Setup Reanimated for testing
// https://docs.swmansion.com/react-native-reanimated/docs/guides/testing/
require('react-native-reanimated').setUpTests();

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
