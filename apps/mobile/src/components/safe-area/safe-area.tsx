import { SafeAreaView } from 'react-native-safe-area-context';

import { Props } from '../../shared/types';

const SafeArea: React.FC<Props> = ({ children }) => {
  return <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>;
};

export default SafeArea;
