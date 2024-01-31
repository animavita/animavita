import { AdoptionType } from '@animavita/types';
import { Ionicons } from '@expo/vector-icons';
import { Box, Button, Icon, Text } from 'native-base';

export const AdoptionCard = ({ name, type }: AdoptionType) => (
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
      <Text color="coolGray.500">{type}</Text>
    </Box>
    <Box flexDir="row">
      <Button leftIcon={<Icon as={Ionicons} name="create-outline" size="md" />} />
      <Button ml={2} leftIcon={<Icon as={Ionicons} name="trash-outline" size="md" />} />
    </Box>
  </Box>
);
