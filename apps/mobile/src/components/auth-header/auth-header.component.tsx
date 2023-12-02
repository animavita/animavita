import { Heading, useTheme, View, Text } from 'native-base';
import { InterfaceViewProps } from 'native-base/lib/typescript/components/basic/View/types';
import React from 'react';

type Props = {
  action: string;
};

const AuthHeader: React.FC<Props & InterfaceViewProps> = ({ action, ...rest }) => {
  const theme = useTheme();

  return (
    <View marginY={20} {...rest}>
      <Heading fontSize="4xl" color={theme.colors.primary[600]}>
        Animavita
      </Heading>
      {!!action && <Text fontSize="2xl">{action}</Text>}
    </View>
  );
};

export default AuthHeader;
