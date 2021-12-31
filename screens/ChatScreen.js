import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import ChatListComp from "../components/ChatListComp";
import HeaderComp from "../components/HeaderComp";
import { defaultStyle } from "../utils/defaultStyle";

const ChatScreen = () => {
  return (
    <SafeAreaView style={[defaultStyle.safeAreaView]}>
      <HeaderComp title="Chat" />
      <ChatListComp />
    </SafeAreaView>
  );
};

export default ChatScreen;
