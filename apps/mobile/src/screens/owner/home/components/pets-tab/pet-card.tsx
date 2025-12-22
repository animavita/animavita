import { AdoptionType } from '@animavita/types';
import { Ionicons } from '@expo/vector-icons';
import { Box, HStack, Icon, IconButton, Image, Text, VStack, Badge, Pressable } from 'native-base';

import useLocale from '@/hooks/use-locale';
import { useNavigation } from '@/navigation/use-navigation';

export const PetCard = (pet: AdoptionType) => {
  const { t } = useLocale();
  const { navigate } = useNavigation();
  const petTypeTranslateKey = `MY_PETS_SCREEN.PET_TYPE.${pet.type.toUpperCase()}`;
  const petImage = pet.photos[0];

  return (
    <Pressable
      onPress={() =>
        navigate('UpdatePet', {
          pet,
        })
      }
    >
      <Box
        bg="white"
        borderRadius="xl"
        shadow={2}
        overflow="hidden"
        borderWidth={1}
        borderColor="coolGray.200"
      >
        <HStack space={3} p={3}>
          <Box>
            <Image source={{ uri: petImage }} alt={pet.name} size="lg" borderRadius="lg" />
          </Box>

          <VStack flex={1} space={1} justifyContent="center">
            <Text fontSize="lg" fontWeight="bold" color="primary.600">
              {pet.name}
            </Text>

            <HStack space={2} alignItems="center">
              <Badge colorScheme="primary" variant="subtle" borderRadius="md">
                {t(petTypeTranslateKey)}
              </Badge>
              <Text fontSize="xs" color="coolGray.500">
                {pet.breed}
              </Text>
            </HStack>

            <HStack space={2} mt={1}>
              <HStack space={1} alignItems="center">
                <Icon as={Ionicons} name="resize-outline" size="xs" color="coolGray.400" />
                <Text fontSize="xs" color="coolGray.500">
                  {pet.size}
                </Text>
              </HStack>
              <HStack space={1} alignItems="center">
                <Icon as={Ionicons} name="time-outline" size="xs" color="coolGray.400" />
                <Text fontSize="xs" color="coolGray.500">
                  {pet.maturity}
                </Text>
              </HStack>
              <HStack space={1} alignItems="center">
                <Icon
                  as={Ionicons}
                  name={pet.gender === 'male' ? 'male' : 'female'}
                  size="xs"
                  color="coolGray.400"
                />
                <Text fontSize="xs" color="coolGray.500">
                  {pet.gender}
                </Text>
              </HStack>
            </HStack>
          </VStack>

          <VStack space={2} justifyContent="center">
            <IconButton
              icon={<Icon as={Ionicons} name="create-outline" />}
              colorScheme="primary"
              variant="subtle"
              borderRadius="lg"
              onPress={() =>
                navigate('UpdatePet', {
                  pet,
                })
              }
              accessibilityHint={t('MY_PETS_SCREEN.CARD_ACTIONS.EDIT')}
              accessibilityLabel={t('MY_PETS_SCREEN.CARD_ACTIONS.EDIT')}
            />
            <IconButton
              icon={<Icon as={Ionicons} name="trash-outline" />}
              colorScheme="danger"
              variant="subtle"
              borderRadius="lg"
              accessibilityHint={t('MY_PETS_SCREEN.CARD_ACTIONS.DELETE')}
              accessibilityLabel={t('MY_PETS_SCREEN.CARD_ACTIONS.DELETE')}
            />
          </VStack>
        </HStack>
      </Box>
    </Pressable>
  );
};
