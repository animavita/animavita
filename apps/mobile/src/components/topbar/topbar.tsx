import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Box, Icon, Pressable } from 'native-base';

import Routes from '@/routes';

const Topbar = () => {
  const { goBack, navigate } = useNavigation();

  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start">
      <Pressable onPress={() => goBack()}>
        <Icon as={Ionicons} name="chevron-back-outline" size="lg" />
      </Pressable>
    </Box>
  );
};

export default Topbar;
