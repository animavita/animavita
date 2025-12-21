import { Ionicons } from '@expo/vector-icons';
import { VStack, Badge, Icon, Button } from 'native-base';

import useLocale from '@/hooks/use-locale';

type FiltersTriggerProps = {
  onPress: () => void;
  appliedCount: number;
};

export const FiltersTrigger = ({ onPress, appliedCount }: FiltersTriggerProps) => {
  const { t } = useLocale();

  return (
    <VStack>
      {appliedCount > 0 && (
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
    </VStack>
  );
};
