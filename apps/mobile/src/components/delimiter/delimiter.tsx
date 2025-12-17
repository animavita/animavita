import { Box } from 'native-base';
import { InterfaceViewProps } from 'native-base/lib/typescript/components/basic/View/types';

import { Props } from '@/shared/types';

const PageDelimiter: React.FC<Props & InterfaceViewProps> = ({ children, ...remainingProps }) => {
  return (
    <Box
      marginX="6"
      marginBottom="4"
      _android={{ marginTop: 4 }}
      _web={{ marginY: 4 }}
      {...remainingProps}
    >
      {children}
    </Box>
  );
};

export const Delimiter: React.FC<Props & InterfaceViewProps> = ({
  children,
  ...remainingProps
}) => {
  return (
    <Box marginX="6" {...remainingProps}>
      {children}
    </Box>
  );
};

export default PageDelimiter;
