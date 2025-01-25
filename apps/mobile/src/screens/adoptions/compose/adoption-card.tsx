import { AdoptionType } from '@animavita/types';
import { Ionicons } from '@expo/vector-icons';
import { Box, Button, Icon, Text } from 'native-base';

import useLocale from '@/hooks/use-locale';
import { useNavigation } from '@/navigation/use-navigation';

export const AdoptionCard = (pet: AdoptionType) => {
  const { t } = useLocale();
  const { navigate } = useNavigation();
  const petTypeTranslateKey = `MY_PETS_SCREEN.PET_TYPE.${pet.type.toUpperCase()}`;

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
          {pet.name.toUpperCase()}
        </Text>
        <Text color="coolGray.500">{t(petTypeTranslateKey)}</Text>
      </Box>
      <Box flexDir="row">
        <Button
          onPress={() =>
            navigate('UpdatePet', {
              pet,
            })
          }
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
