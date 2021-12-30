import React, { useEffect } from "react";
import {
  View,
  Text,
  Button,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { tinderBackgroundImg } from "../utils/images";
import tw from "twrnc";

const LoginScreen = () => {
  const { signInWithGoogle, loading } = useAuth();
  const navigation = useNavigation();

  return (
    <ImageBackground
      resizeMode="cover"
      style={tw`flex-1`}
      source={{ uri: tinderBackgroundImg }}
    >
      <TouchableOpacity
        style={[
          tw`absolute bottom-40 w-52 bg-white p-4 rounded-2xl`,
          { marginHorizontal: "25%" },
        ]}
        onPress={signInWithGoogle}
        activeOpacity={0.8}
      >
        <Text style={[tw`font-semibold text-center`]}>
          Sign in & get swiping
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default LoginScreen;
