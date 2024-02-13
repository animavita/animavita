import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Box, Icon, Pressable } from 'native-base';

const Topbar = () => {
  const { goBack } = useNavigation();

  return (
    <Box display="flex" flexDirection="row">
      <Pressable onPress={() => goBack()}>
        <Icon as={Ionicons} name="chevron-back-outline" size="lg" ml={-2} />
      </Pressable>
    </Box>
  );
};

export default Topbar;
