import React, { useRef } from "react";
import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native";
import useAuth from "../hooks/useAuth";
import { defaultStyle } from "../utils/defaultStyle";
import tw from "twrnc";
import { Ionicons, AntDesign, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { screenNames } from "../utils/screenNames";
import Swiper from "react-native-deck-swiper";
import { DUMMY_DATA } from "../utils/dummyData";

const HomeScreen = () => {
  const { logout, user } = useAuth();
  const navigation = useNavigation();
  const swipeRef = useRef(null);

  return (
    <SafeAreaView style={[tw`flex-1`, defaultStyle.safeAreaView]}>
      {/* Header */}
      <View style={tw`flex-row items-center justify-between px-5`}>
        <TouchableOpacity onPress={logout}>
          <Image
            style={[tw`h-10 w-10 rounded-full`]}
            source={{ uri: user?.photoURL }}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            source={require("../assets/logo.png")}
            style={[tw`h-14 w-14`]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate(screenNames.chatScreen)}
        >
          <Ionicons name="chatbubbles-sharp" size={30} color={"#ff5864"} />
        </TouchableOpacity>
      </View>
      {/* end of header */}

      <View style={tw`flex-1 -mt-6`}>
        <Swiper
          ref={swipeRef}
          containerStyle={{ backgroundColor: "transparent" }}
          cards={DUMMY_DATA}
          stackSize={5}
          cardIndex={0}
          verticalSwipe={false}
          animateCardOpacity
          backgroundColor="#4fd0e9"
          onSwipedLeft={() => console.log("Swipe PASS")}
          onSwipedRight={() => console.log("Swipe MATCH")}
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                },
              },
            },
            right: {
              title: "MATCH",
              style: { label: { color: "#4ded30" } },
            },
          }}
          renderCard={(card) => (
            <View
              key={card.id}
              style={tw`relative bg-red-500 h-3/4 rounded-xl`}
            >
              <Image
                style={tw`absolute top-0 h-full w-full rounded-xl`}
                source={{ uri: card.photoURL }}
              />

              <View
                style={[
                  tw`absolute bottom-0 bg-white w-full h-20 flex-row
                 justify-between items-center px-6  py-2 rounded-b-xl`,
                  styles.cardShadow,
                ]}
              >
                <View>
                  <Text style={tw`text-xl font-bold`}>
                    {card.first_name} {card.last_name}
                  </Text>
                  <Text>{card.occupation}</Text>
                </View>
                <Text style={tw`text-2xl font-bold`}>{card.age}</Text>
              </View>
            </View>
          )}
        />
      </View>

      <View style={tw`flex flex-row justify-evenly mb-2`}>
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeLeft()}
          style={tw`items-center justify-center rounded-full w-16 h-16 bg-red-200`}
        >
          <Entypo name="cross" size={24} color="red" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => swipeRef.current.swipeRight()}
          style={tw`items-center justify-center rounded-full w-16 h-16 bg-green-200`}
        >
          <AntDesign name="heart" size={24} color="green" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
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
