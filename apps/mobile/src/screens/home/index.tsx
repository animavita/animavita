import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import useAdoptions from "../../hooks/use-adoptions";
import Routes from "../../routes";
import client from "../../services/http-client";
import { Button } from "react-native-paper";

export default function Home() {
  const navigation = useNavigation();

  const { adoptions, isLoading } = useAdoptions();

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>{client.defaults.baseURL}</Text>
      <Text>Adoptions demo</Text>
      <Button
        mode="contained"
        elevation={3}
        onPress={() => {
          navigation.navigate(Routes.RegisterAdoption);
        }}
      >
        Register Adoption
      </Button>
      {isLoading && <Text>Loading...</Text>}
      {adoptions && (
        <View style={styles.adoption}>
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
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  adoption: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});
