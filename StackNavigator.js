import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View, Text } from "react-native";
import useAuth from "./hooks/useAuth";
import ChatScreen from "./screens/ChatScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import { screenNames } from "./utils/screenNames";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  let { user } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {user ? (
        <>
          <Stack.Screen name={screenNames.homeScreen} component={HomeScreen} />
          <Stack.Screen name={screenNames.chatScreen} component={ChatScreen} />
        </>
      ) : (
        <Stack.Screen name={screenNames.loginScreen} component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
