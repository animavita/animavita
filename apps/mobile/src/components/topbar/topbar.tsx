import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Box, Icon, Pressable } from 'native-base';

import Delimiter from '../delimiter/delimiter';

const Topbar = () => {
  const { goBack } = useNavigation();

  return (
    <Delimiter>
      <Box display="flex" flexDirection="row">
        <Pressable onPress={() => goBack()}>
          <Icon as={Ionicons} name="chevron-back-outline" size="lg" />
        </Pressable>
      </Box>
    </Delimiter>
  );
};

export default Topbar;
