import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
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
import { papaImage } from "../utils/images";
import {
  doc,
  onSnapshot,
  collection,
  setDoc,
  updateDoc,
  addDoc,
  getDocs,
  query,
  where,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import generateId from "../utils/generateID";

const HomeScreen = () => {
  const { logout, user } = useAuth();
  const navigation = useNavigation();
  const swipeRef = useRef(null);

  const [profiles, setProfiles] = useState([]);

  useLayoutEffect(
    () =>
      onSnapshot(doc(db, "users", user.uid), (shapshot) => {
        if (!shapshot.exists()) {
          navigation.navigate(screenNames.modalScreen);
        }
      }),
    []
  );

  useEffect(() => {
    let unsub;
    const fetchCards = async () => {
      const passes = [user.uid];

      await getDocs(collection(db, "users", user.uid, "passes")).then(
        (snapshot) => snapshot.docs.map((doc) => passes.push(doc.id))
      );

      const swipes = ["test"]; // we cant query empty erray to firebase backend
      await getDocs(collection(db, "users", user.uid, "swipes")).then(
        (snapshot) => snapshot.docs.map((doc) => swipes.push(doc.id))
      );

      unsub = onSnapshot(
        query(
          collection(db, "users"),
          where("id", "not-in", [...passes, ...swipes])
        ),
        (snapshot) => {
          setProfiles(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        }
      );
    };

    fetchCards();
    return unsub;
  }, [db]);

  const swipeLeft = async (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    // console.log(`You swiped PASSES on ${userSwiped}`);
    await setDoc(
      doc(db, "users", user.uid, "passes", userSwiped.id),
      userSwiped
    );
  };

  const swipeRight = async (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    // console.log(`You swiped on ${userSwiped}`);

    await setDoc(
      doc(db, "users", user.uid, "swipes", userSwiped.id),
      userSwiped
    );

    const loggedInProfile = (await getDoc(doc(db, "users", user.uid))).data();

    await getDoc(doc(db, "users", userSwiped.id, "swipes", user.uid)).then(
      (documentSnapshot) => {
        if (documentSnapshot.exists()) {
          console.log(`Hoorey, you matched with ${userSwiped.displayName}`);
          // user have macthed with you before you matched with them...

          // create a MATCH!!
          setDoc(doc(db, "matches", generateId(user.uid, userSwiped.id)), {
            users: {
              [user.uid]: loggedInProfile,
              [userSwiped.id]: userSwiped,
            },
            usersMatched: [user.uid, userSwiped.id],
            timeStamp: serverTimestamp(),
          });

          navigation.navigate(screenNames.matchScreen, {
            loggedInProfile,
            userSwiped,
          });
        }
      }
    );
  };

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

        <TouchableOpacity
          onPress={() => navigation.navigate(screenNames.modalScreen)}
        >
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
          cards={profiles}
          stackSize={5}
          cardIndex={0}
          verticalSwipe={false}
          animateCardOpacity
          backgroundColor="#4fd0e9"
          onSwipedLeft={(cardIndex) => swipeLeft(cardIndex)}
          onSwipedRight={(cardIndex) => swipeRight(cardIndex)}
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
          renderCard={(card) =>
            card ? (
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
                    defaultStyle.cardShadow,
                  ]}
                >
                  <View>
                    <Text style={tw`text-xl font-bold`}>
                      {card.displayName}
                    </Text>
                    <Text>{card.job}</Text>
                  </View>
                  <Text style={tw`text-2xl font-bold`}>{card.age}</Text>
                </View>
              </View>
            ) : (
              <View
                style={[
                  tw`relative bg-white h-3/4 rounded-xl justify-center items-center`,
                  defaultStyle.cardShadow,
                ]}
              >
                <Text style={tw`font-bold pb-5`}>No more profiles</Text>
                <Image
                  style={tw`h-20 w-full`}
                  resizeMode="contain"
                  source={{ uri: papaImage("6gb") }}
                />
              </View>
            )
          }
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
