import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import tw from "twrnc";
import { defaultStyle } from "../utils/defaultStyle";
import { papaImage } from "../utils/images";
import { screenNames } from "../utils/screenNames";

const MatchScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();

  const { loggedInProfile, userSwiped } = params;

  return (
    <SafeAreaView style={[tw`h-full bg-red-500 pt-20`, { opacity: 0.89 }]}>
      <View style={tw`justify-center px-10 pt-20`}>
        <Image
          source={{ uri: papaImage("mg9") }}
          style={tw`h-20 w-full`}
          resizeMode="contain"
        />
      </View>

      <Text style={tw`text-white text-center mt-5`}>
        You and {userSwiped.displayName} have liked each other.
      </Text>

      <View style={tw`flex-row justify-evenly mt-5`}>
        <Image
          style={tw`h-32 w-32 rounded-full`}
          source={{ uri: loggedInProfile.photoURL }}
        />
        <Image
          style={tw`h-32 w-32 rounded-full`}
          source={{ uri: userSwiped.photoURL }}
        />
      </View>

      <TouchableOpacity
        style={tw`bg-white m-5 px-10 py-8 rounded-full mt-20`}
        activeOpacity={0.6}
        onPress={() => {
          navigation.goBack();
          navigation.navigate(screenNames.chatScreen);
        }}
      >
        <Text style={tw`text-center`}>Send a Message</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MatchScreen;
