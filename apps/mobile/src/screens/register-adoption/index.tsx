import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Avatar,
  Button,
  Headline,
  RadioButton,
  Subheading,
  Text,
  TextInput,
  Title,
} from "react-native-paper";
import Container from "../../components/Container";
import RNSlider from "../../components/Slider";
import useLocale from "../../hooks/use-locale";
import theme from "../../theme";
import { Dimensions } from "react-native";

export default function RegisterAdoption() {
  const { t } = useLocale();

  const navigation = useNavigation();
  const [text, setText] = useState("");
  const [checked, setChecked] = useState("first");

  return (
    <Container>
      <div style={styles.titleContainer}>
        <Headline style={{ fontWeight: "bold" }}>
          {t("REGISTER_ADOPTION.TITLE")}
        </Headline>
        <Avatar.Image
          size={38}
          source={{
            uri: "https://i.pinimg.com/originals/97/a8/09/97a8096f32ad5bd41de2c54f5949a06d.jpg",
          }}
        />
      </div>

      <form style={styles.formContainer}>
        <TextInput
          label={t("REGISTER_ADOPTION.FORM.NAME")}
          placeholder={t("REGISTER_ADOPTION.FORM.NAME_PLACEHOLDER")}
          mode="outlined"
          value={text}
          onChangeText={(text) => setText(text)}
        />
        <TextInput
          label={t("REGISTER_ADOPTION.FORM.BREED")}
          placeholder={t("REGISTER_ADOPTION.FORM.BREED_PLACEHOLDER")}
          mode="outlined"
          value={text}
          onChangeText={(text) => setText(text)}
        />
        <TextInput
          label={t("REGISTER_ADOPTION.FORM.OBSERVATIONS")}
          placeholder={t("REGISTER_ADOPTION.FORM.OBSERVATIONS_PLACEHOLDER")}
          multiline
          numberOfLines={2}
          mode="outlined"
          value={text}
          onChangeText={(text) => setText(text)}
        />
        <Subheading>
          {t("REGISTER_ADOPTION.FORM.TYPE_OPTIONS.LABEL")}
        </Subheading>
        <View style={styles.typesContainer}>
          {["DOG", "CAT", "OTHER"].map((type) => (
            <Button
              key={type}
              mode="outlined"
              onPress={() => console.log("first")}
              style={{
                borderRadius: 100,
                borderColor: theme.colors.primary,
                borderWidth: 2,
              }}
            >
              {t(`REGISTER_ADOPTION.FORM.TYPE_OPTIONS.${type}`)}
            </Button>
          ))}
        </View>
        <Subheading>{t("REGISTER_ADOPTION.FORM.AGE")}</Subheading>
        <RNSlider />
        <Subheading style={{ color: theme.colors.primary }}>
          1 {t("YEAR")}
        </Subheading>
        <RadioButton.Group
          onValueChange={(value) => setChecked(value)}
          value={checked}
        >
          <Subheading>{t("REGISTER_ADOPTION.FORM.SEX.LABEL")}</Subheading>
          <RadioButton.Item
            label={t("REGISTER_ADOPTION.FORM.SEX.MALE")}
            value="first"
          />
          <RadioButton.Item
            label={t("REGISTER_ADOPTION.FORM.SEX.FEMALE")}
            value="second"
          />
        </RadioButton.Group>
        <Subheading>{t("REGISTER_ADOPTION.FORM.SIZE.LABEL")}</Subheading>
        <View style={styles.typesContainer}>
          {["SMALL", "MEDIUM", "BIG"].map((type) => (
            <Button
              key={type}
              mode="outlined"
              onPress={() => console.log("first")}
              style={{
                borderRadius: 100,
                borderColor: theme.colors.primary,
                borderWidth: 2,
              }}
            >
              {t(`REGISTER_ADOPTION.FORM.SIZE.${type}`)}
            </Button>
          ))}
        </View>
        <Button
          mode="contained"
          color={theme.colors.accent}
          style={{ elevation: 0 }}
          labelStyle={{ padding: 10, color: theme.colors.onPrimary }}
          onPress={() => console.log("first")}
        >
          {t("REGISTER_ADOPTION.FORM.CONFIRM_BUTTON")}
        </Button>
      </form>
    </Container>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  formContainer: {
    display: "flex",
    position: "relative",
    flexDirection: "column",
    gap: 24,
  },
  typesContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
