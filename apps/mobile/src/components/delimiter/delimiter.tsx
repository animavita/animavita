import { View } from 'native-base';
import { InterfaceViewProps } from 'native-base/lib/typescript/components/basic/View/types';

import { Props } from '@/shared/types';

const Delimiter: React.FC<Props & InterfaceViewProps> = ({ children, ...remainingProps }) => {
  return (
    <View marginX="6" marginY="4" {...remainingProps}>
      {children}
    </View>
  );
};

export default Delimiter;
