import React from "react";
import { View, Text, Button } from "react-native";
import useAuth from "../hooks/useAuth";

const HomeScreen = () => {
  const { logout } = useAuth();

  return (
    <View>
      <Text>this is home screen</Text>

      <Button title="Logout" onPress={logout} />
    </View>
  );
};

export default HomeScreen;
