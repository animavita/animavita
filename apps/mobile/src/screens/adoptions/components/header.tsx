import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Box, Heading, Icon, Text } from 'native-base';
import { Pressable } from 'react-native';

export const Header = () => {
  const { goBack } = useNavigation();

  return (
    <Box mb={4} alignItems="flex-start">
      <Pressable onPress={() => goBack()}>
        <Icon as={Ionicons} name="arrow-back-outline" size="lg" />
      </Pressable>
      <Box mt={4}>
        <Heading size="xl" color="primary.500">
          My Adoptions
        </Heading>
        <Text mt={1} color="coolGray.500">
          Check adoptions you have created so far!
        </Text>
      </Box>
    </Box>
  );
};
