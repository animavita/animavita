import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Badge, Box, Button, Icon, Text, VStack } from 'native-base';

import useAdoptions from '../../../hooks/use-adoptions';
import useLocale from '../../../hooks/use-locale';
import Routes from '../../../routes';

const AdoptionsTab = () => {
  const { adoptions } = useAdoptions();
  const navigation = useNavigation();
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
        <Button
          variant="solid"
          size="sm"
          onPress={() => {
            navigation.navigate(Routes.RegisterAdoption);
          }}
          marginTop="auto"
        >
          {t('HOME.REGISTER_ADOPTION')}
        </Button>
      </Box>

      {adoptions &&
        adoptions.map((adoption) => {
          const { name, gender, size } = adoption;

          return (
            <>
              <Text>{name}</Text>
              <Text>{gender}</Text>
              <Text>{size}</Text>
            </>
          );
        })}
    </Box>
  );
};

export default AdoptionsTab;
