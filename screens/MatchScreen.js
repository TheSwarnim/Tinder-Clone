import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { View, Text, SafeAreaView, Image } from "react-native";
import tw from "twrnc";
import { defaultStyle } from "../utils/defaultStyle";
import { papaImage } from "../utils/images";

const MatchScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();

  const { loggedInProfile, userSwiped } = params;

  return (
    <SafeAreaView style={[tw`h-full bg-red-500 pt-20`, { opacity: 0.89 }]}>
      <View style={tw`justify-center px-10 pt-20`}>
        <Image
          source={{ uri: papaImage("mg9") }}
          style={tw`w-50 h-20`}
          resizeMode="contain"
        />
      </View>
      <Text>this is match screen</Text>
    </SafeAreaView>
  );
};

export default MatchScreen;
