import { Ionicons } from '@expo/vector-icons';
import { Box, Fab, Icon } from 'native-base';
import React from 'react';

import useLocale from '@/hooks/use-locale';
import { useNavigation } from '@/navigation/use-navigation';

const PetsTab = () => {
  const navigation = useNavigation();
  const { t } = useLocale();

  return (
    <Box flex={1}>
      <Fab
        renderInPortal={false}
        shadow={2}
        size="sm"
        icon={<Icon color="white" as={Ionicons} name="add" size="md" />}
        placement="bottom-right"
        onPress={() => {
          navigation.navigate('RegisterPet');
        }}
        aria-label={t('HOME.REGISTER_ADOPTION')}
        right={2}
        bottom={2}
      />
    </Box>
  );
};

export default PetsTab;
