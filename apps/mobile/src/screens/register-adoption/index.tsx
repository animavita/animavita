import { useNavigation } from "@react-navigation/native";
import { Button, Text } from "react-native";

export default function RegisterAdoption() {
  const navigation = useNavigation();

  return (
    <div>
      <Text>RegisterAdoption</Text>
      <Button
        title="Register Adoption"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </div>
  );
}
