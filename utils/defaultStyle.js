import { Platform, StatusBar, StyleSheet } from "react-native";

export const defaultStyle = StyleSheet.create({
  safeAreaView: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, // for android
  },
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});

export const primaryColor = "#ff5864";
