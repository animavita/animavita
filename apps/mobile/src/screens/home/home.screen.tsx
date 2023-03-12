import { useNavigation } from '@react-navigation/native';
import { Box, Button, Text, View } from 'native-base';

import useAdoptions from '../../hooks/use-adoptions';
import Routes from '../../routes';
import client from '../../services/http-client';
import AppStatusBar from '../../shared/components/status-bar/status-bar.component';
import { useAuth } from '../../shared/hooks/use-auth-provider';

const Home = () => {
  const navigation = useNavigation();
  const auth = useAuth();
  const { adoptions, loading } = useAdoptions();

  return (
    <View flex="1" alignItems="center" justifyContent="center">
      <AppStatusBar />
      <Text>{client.defaults.baseURL}</Text>
      <Text>Adoptions demo</Text>
      <Button
        variant="outline"
        onPress={() => {
          navigation.navigate(Routes.RegisterAdoption);
        }}
      >
        Register Adoption
      </Button>
      <Button
        variant="outline"
        onPress={() => {
          auth.signOut();
        }}
      >
        Sair
      </Button>
      {loading && <Text>Loading...</Text>}
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
};

export default Home;
