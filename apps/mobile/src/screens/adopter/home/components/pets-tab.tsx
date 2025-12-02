import { Ionicons } from '@expo/vector-icons';
import { Badge, Box, Button, Icon, VStack } from 'native-base';
import React from 'react';

import useLocale from '@/hooks/use-locale';

const PetsTab = () => {
  const { t } = useLocale();

  return (
    <Box>
      <Box marginY="4" display="flex" flexDirection="row" justifyContent="space-between">
        <VStack>
          <Badge
            colorScheme="orange"
            rounded="full"
            mb={-4}
            mr={-4}
            zIndex={1}
            variant="solid"
            alignSelf="flex-end"
            _text={{
              fontSize: 12,
            }}
          >
            2
          </Badge>
          <Button variant="solid" size="sm" leftIcon={<Icon as={Ionicons} name="filter" />}>
            {t('HOME.FILTER')}
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default PetsTab;
