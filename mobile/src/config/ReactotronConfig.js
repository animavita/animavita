import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

if (__DEV__) {
  const tron = Reactotron.configure({ host: '10.10.10.9' })
    .use(reactotronRedux())
    .connect();

  tron.clear();

  // eslint-disable-next-line no-console
  console.tron = tron;
}
