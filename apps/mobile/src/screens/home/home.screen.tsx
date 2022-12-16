import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Button } from 'native-base';
import { Text } from 'react-native';

import { Adoption, Container } from './home.styles';
import useAdoptions from '../../hooks/use-adoptions';
import Routes from '../../routes';
import client from '../../services/http-client';

export default function Home() {
  const navigation = useNavigation();

  const { adoptions, isLoading } = useAdoptions();

  return (
    <Container>
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
        <Adoption>
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
        </Adoption>
      )}
    </Container>
  );
}
