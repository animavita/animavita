import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Appbar, useTheme } from "react-native-paper";

export default function Header() {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <Appbar.Header
      style={{
        backgroundColor: theme.colors.background,
        elevation: 0,
      }}
    >
      {navigation.canGoBack() && (
        <Appbar.BackAction
          color={theme.colors.backdrop}
          onPress={() => {
            navigation.goBack();
          }}
        />
      )}
    </Appbar.Header>
  );
}
