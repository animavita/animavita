import { AdoptionType } from '@animavita/types';
import { Ionicons } from '@expo/vector-icons';
import { Box, Button, Icon, Text } from 'native-base';

import useLocale from '@/hooks/use-locale';

export const AdoptionCard = ({ name, type }: AdoptionType) => {
  const { t } = useLocale();
  const petTypeTranslateKey = `MY_PETS_SCREEN.PET_TYPE.${type.toUpperCase()}`;

  return (
    <Box
      p={2}
      flexDir="row"
      justifyContent="space-between"
      bg="coolGray.100"
      borderRadius="md"
      alignItems="center"
      borderColor="coolGray.300"
      borderWidth={1}
    >
      <Box>
        <Text color="primary.500" fontWeight="bold">
          {name.toUpperCase()}
        </Text>
        <Text color="coolGray.500">{t(petTypeTranslateKey)}</Text>
      </Box>
      <Box flexDir="row">
        <Button
          leftIcon={
            <Icon
              as={Ionicons}
              name="create-outline"
              size="md"
              accessible
              accessibilityHint={t('MY_PETS_SCREEN.CARD_ACTIONS.EDIT')}
              accessibilityLabel={t('MY_PETS_SCREEN.CARD_ACTIONS.EDIT')}
            />
          }
        />
        <Button
          ml={2}
          leftIcon={
            <Icon
              as={Ionicons}
              name="trash-outline"
              size="md"
              accessible
              accessibilityHint={t('MY_PETS_SCREEN.CARD_ACTIONS.DELETE')}
              accessibilityLabel={t('MY_PETS_SCREEN.CARD_ACTIONS.DELETE')}
            />
          }
        />
      </Box>
    </Box>
  );
};
