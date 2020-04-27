import React from 'react';
import { Provider } from 'react-redux';
import { MockedProvider } from '@apollo/react-testing';

export default ({ children, apolloStore, reduxStore }) => (
  <MockedProvider mocks={apolloStore}>
    <Provider store={reduxStore}>{children}</Provider>
  </MockedProvider>
);
