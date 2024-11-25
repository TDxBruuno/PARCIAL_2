import React from "react";
import { View, StyleSheet } from "react-native";
import FutbolGames from "../components/FutbolGames";

export default function Index() {
  return (
    <View style={styles.container}>
      <FutbolGames />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    width: "85%",
    marginLeft: "auto",
    marginRight: "auto",
  },
});
