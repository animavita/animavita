import React, { useEffect, useState } from 'react';
import OneSignal from 'react-native-onesignal';
import { ONE_SIGNAL_APP_KEY } from '~/utils/constants';
import FlashMessage from 'react-native-flash-message';
import { ApolloProvider } from '@apollo/react-hooks';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createRootNavigator } from './routes';
import client from './apollo/client';
import '~/config/ReactotronConfig';
import { getToken } from '~/utils/helpers';
import { store, persistor } from './store';
import Loading from '~/components/Loading';

const App = () => {
  const [signed, setSigned] = useState(false);
  const [loading, setLoading] = useState(true);

  function onReceived(notification) {
    console.log('Notification received: ', notification);
  }

  function onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  function onIds(device) {
    console.log('Device info: ', device);
  }

  async function getData() {
    const token = await getToken();
    if (token) {
      setSigned(!!token);
    }
    setLoading(false);
  }

  useEffect(() => {
    getData();
    OneSignal.init(ONE_SIGNAL_APP_KEY);
    OneSignal.addEventListener('received', onReceived);
    OneSignal.addEventListener('opened', onOpened);
    OneSignal.addEventListener('ids', onIds);
    return () => {
      OneSignal.removeEventListener('received', this.onReceived);
      OneSignal.removeEventListener('opened', this.onOpened);
      OneSignal.removeEventListener('ids', this.onIds);
    };
  }, []);

  if (loading) {
    return <Loading />;
  }

  const Routes = createRootNavigator(signed);
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes />
          <FlashMessage position="top" />
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
};

export default App;
