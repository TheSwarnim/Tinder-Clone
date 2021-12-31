import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import useAuth from "../hooks/useAuth";
import getMatchedUserInfo from "../utils/getMatchedUserInfo";
import { useState, useEffect } from "react";
import tw from "twrnc";
import { screenNames } from "../utils/screenNames";
import { db } from "../firebase";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

const ChatRowComp = ({ matchDetails }) => {
  const navigation = useNavigation();
  const { user } = useAuth();

  const [matchedUserInfo, setMatchedUserInfo] = useState(null);

  useEffect(() => {
    setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid));

    return () => {};
  }, [matchDetails, user]);

  // last message
  const [lastMessage, setLastMessage] = useState("");

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matches", matchDetails.id, "messages"),
          orderBy("timeStamp", "desc"),
          limit(1)
        ),
        (snapshot) => setLastMessage(snapshot.docs[0]?.data()?.message)
      ),
    [matchDetails, db]
  );

  return (
    <TouchableOpacity
      style={tw`flex-row items-center py-3 px-5 bg-white mx-3 my-1 rounded-lg`}
      onPress={() =>
        navigation.navigate(screenNames.messagesScreen, { matchDetails })
      }
    >
      <Image
        resizeMode="contain"
        source={{ uri: matchedUserInfo?.photoURL }}
        style={tw`mr-4 h-16 w-16 rounded-full`}
      />

      <View>
        <Text style={tw`text-lg font-semibold`}>
          {matchedUserInfo?.displayName}
        </Text>
        <Text>{lastMessage || "Say Hi!"}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRowComp;
