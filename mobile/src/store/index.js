import AsyncStorage from '@react-native-community/async-storage';
import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import reducers from './ducks';

const persistConfig = {
  key: 'root',
  timeout: 0,
  storage: AsyncStorage,
  whitelist: ['auth', 'favorite'],
};
const middlewares = [];

const composer = __DEV__
  ? compose(
    applyMiddleware(...middlewares),
    console.tron.createEnhancer(),
  )
  : compose(applyMiddleware(...middlewares));

const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer, composer);

const persistor = persistStore(store);

export { store, persistor };
