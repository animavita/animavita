import { View } from 'native-base';

import { Props } from '../../shared/types';

const Delimiter: React.FC<Props> = ({ children, ...remainingProps }) => {
  return (
    <View marginX="6" {...remainingProps}>
      {children}
    </View>
  );
};

export default Delimiter;
