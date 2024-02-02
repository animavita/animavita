import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { t } from 'i18next';
import { Box, Button, Icon, Pressable, Text } from 'native-base';

import Routes from '@/routes';

const Topbar = () => {
  const { goBack, navigate } = useNavigation();

  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start">
      <Pressable onPress={() => goBack()}>
        <Icon as={Ionicons} name="chevron-back-outline" size="lg" />
      </Pressable>

      <Box mt={10}>
        <Button
          onPress={() => navigate(Routes.MyAdoptions as never)}
          variant="ghost"
          leftIcon={<Icon as={MaterialIcons} name="pets" size="lg" color="primary.300" />}
        >
          <Text color="primary.300">{t('MY_PETS_SCREEN.TITLE')}</Text>
        </Button>
      </Box>
    </Box>
  );
};

export default Topbar;
