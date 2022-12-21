import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Box, Button, Text, View } from 'native-base';

import useAdoptions from '../../hooks/use-adoptions';
import Routes from '../../routes';
import client from '../../services/http-client';

export default function Home() {
  const navigation = useNavigation();

  const { adoptions, isLoading } = useAdoptions();

  return (
    <View margin={8} flex="1">
      <StatusBar style="auto" />
      <Text>{client.defaults.baseURL}</Text>
      <Text>Adoptions demo</Text>
      <Button
        variant="outline"
        onPress={() => {
          navigation.navigate(Routes.RegisterAdoption);
        }}>
        Register Adoption
      </Button>
      {isLoading && <Text>Loading...</Text>}
      {adoptions && (
        <Box>
          {adoptions.map((adoption) => {
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
      )}
    </View>
  );
}
