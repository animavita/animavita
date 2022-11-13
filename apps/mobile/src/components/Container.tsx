import React from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import Header from "./Header";

export default function Container({ children }: { children: React.ReactNode }) {
  const theme = useTheme();

  return (
    <>
      <Header />
      <div
        style={{
          ...styles.container,
          backgroundColor: theme.colors.background,
        }}
      >
        {children}
      </div>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16
  },
});
