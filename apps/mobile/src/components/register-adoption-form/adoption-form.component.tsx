import React, { useState } from "react";
import { Button, RadioButton, Subheading, TextInput } from "react-native-paper";
import RNSlider from "../../shared/components/Slider";
import useLocale from "../../shared/hooks/use-locale";
import theme from "../../theme";
import { Form, Types } from "./adoption-form.styles";

export default function RegisterAdoptionForm() {
  const { t } = useLocale();

  const [text, setText] = useState("");
  const [checked, setChecked] = useState("first");

  return (
    <Form>
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
      <Subheading>{t("REGISTER_ADOPTION.FORM.TYPE_OPTIONS.LABEL")}</Subheading>
      <Types>
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
      </Types>
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
      <Types>
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
      </Types>
      <Button
        mode="contained"
        color={theme.colors.accent}
        style={{ elevation: 0 }}
        labelStyle={{ padding: 10, color: theme.colors.onPrimary }}
        onPress={() => console.log("first")}
      >
        {t("REGISTER_ADOPTION.FORM.CONFIRM_BUTTON")}
      </Button>
    </Form>
  );
}
