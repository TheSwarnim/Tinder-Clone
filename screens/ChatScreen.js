import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { defaultStyle } from "../utils/defaultStyle";

const ChatScreen = () => {
  return (
    <SafeAreaView style={[defaultStyle.safeAreaView]}>
      <Text>This is chat screen</Text>
    </SafeAreaView>
  );
};

export default ChatScreen;
