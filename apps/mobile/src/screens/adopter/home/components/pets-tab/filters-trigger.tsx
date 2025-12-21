import { Ionicons } from '@expo/vector-icons';
import { Box, Badge, Icon, Button } from 'native-base';

import useLocale from '@/hooks/use-locale';

type FiltersTriggerProps = {
  onPress: () => void;
  appliedCount: number;
};

export const FiltersTrigger = ({ onPress, appliedCount }: FiltersTriggerProps) => {
  const { t } = useLocale();

  return (
    <Box position="relative" alignSelf="flex-start">
      {appliedCount > 0 && (
        <Badge
          position="absolute"
          top={-10}
          right={-10}
          colorScheme="orange"
          rounded="full"
          zIndex={1}
          variant="solid"
          pointerEvents="none"
          _text={{ fontSize: 12 }}
        >
          {appliedCount}
        </Badge>
      )}
      <Button
        variant="solid"
        size="sm"
        leftIcon={<Icon as={Ionicons} name="filter" />}
        onPress={onPress}
      >
        {t('HOME.FILTER')}
      </Button>
    </Box>
  );
};
