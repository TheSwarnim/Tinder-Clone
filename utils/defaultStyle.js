import { Platform, StatusBar, StyleSheet } from "react-native";

export const defaultStyle = StyleSheet.create({
  safeAreaView: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, // for android
  },
});
