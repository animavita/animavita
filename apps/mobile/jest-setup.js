import { server } from './src/test/msw/server';

// https://github.com/callstack/react-native-paper/issues/4561
jest.mock('expo-font');

jest.mock('posthog-react-native', () => ({
  useFeatureFlag: jest.fn(),
}));

// Setup Reanimated for testing
// https://docs.swmansion.com/react-native-reanimated/docs/guides/testing/
require('react-native-reanimated').setUpTests();

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
