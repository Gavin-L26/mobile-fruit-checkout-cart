import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Price from "./price";

export default function App() {
  return <Price />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
