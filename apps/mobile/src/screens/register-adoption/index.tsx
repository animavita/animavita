import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";
import { Button } from "react-native-paper";

export default function RegisterAdoption() {
  const navigation = useNavigation();

  return (
    <div>
      <Text>RegisterAdoption</Text>
      <Button
        mode="contained"
        onPress={() => {
          navigation.goBack();
        }}
      >
        Back
      </Button>
    </div>
  );
}
