import { notifyManager } from '@tanstack/query-core';
import { act } from '@testing-library/react-native';

import { server } from './src/test/msw/server';

// TanStack Query v5: configure batching so React Native tests flush updates
notifyManager.setBatchNotifyFunction((cb) => {
  act(() => cb());
});

// https://github.com/callstack/react-native-paper/issues/4561
jest.mock('expo-font');

jest.mock('posthog-react-native', () => ({
  useFeatureFlag: jest.fn(),
}));

// Silence act warnings from @expo/vector-icons in tests
jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { View } = require('react-native');

  const MockIcon = () => React.createElement(View, { accessibilityLabel: 'MockIcon' });

  return {
    Ionicons: MockIcon,
    MaterialIcons: MockIcon,
    MaterialCommunityIcons: MockIcon,
    FontAwesome: MockIcon,
    FontAwesome5: MockIcon,
    Entypo: MockIcon,
    AntDesign: MockIcon,
    Feather: MockIcon,
    Octicons: MockIcon,
    Foundation: MockIcon,
    SimpleLineIcons: MockIcon,
    Zocial: MockIcon,
  };
});

// Mock react-native-vector-icons AntDesign to avoid font loading state updates
jest.mock('react-native-vector-icons/AntDesign', () => {
  const React = require('react');
  const { View } = require('react-native');
  return () => React.createElement(View, { accessibilityLabel: 'MockAntDesignIcon' });
});

// Mock NativeBase Actionsheet to avoid Portal updates in tests
// Keeps behavior for our tests without triggering act warnings
jest.mock('native-base', () => {
  const actual = jest.requireActual('native-base');
  const React = require('react');

  const MockActionsheet = ({ isOpen, onClose, children }) => {
    // Only render when open to mimic visibility without Portal registration
    if (!isOpen) return null;
    return React.createElement(actual.Box, { accessibilityLabel: 'Actionsheet' }, children);
  };
  MockActionsheet.Content = ({ children }) => React.createElement(actual.Box, null, children);

  const MockUseToast = jest.fn(() => ({
    show: jest.fn(),
    isActive: jest.fn(),
  }));

  return {
    ...actual,
    Actionsheet: MockActionsheet,
    useToast: MockUseToast,
  };
});

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

// Configure batching via notifyManager in tests if act warnings surface.
