import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { AdoptionType } from "@animavita/models";
import { useEffect, useState } from "react";
import { getAllAdoptions } from "./src/services/adoptions";
import client from "./src/services/http-client";

export default function App() {
  const [adoptions, setAdoptions] = useState<AdoptionType[] | null>(null);

  useEffect(() => {
    (async () => {
      const response = await getAllAdoptions();

      if (response.data) {
        setAdoptions(response.data);
      }
    })();
  }, []);

  if (!adoptions)
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
        <Text>{client.defaults.baseURL}</Text>
        <StatusBar style="auto" />
      </View>
    );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>{client.defaults.baseURL}</Text>
      <Text>Adoptions demo</Text>

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
