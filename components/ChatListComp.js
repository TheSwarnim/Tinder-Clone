import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";
import tw from "twrnc";
import ChatRowComp from "./ChatRowComp";

const ChatListComp = () => {
  const [matches, setMatches] = useState([]);

  const { user } = useAuth();

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matches"),
          where("usersMatched", "array-contains", user.uid)
        ),
        (snapshot) => {
          setMatches(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        }
      ),
    [user]
  );

  return matches.length > 0 ? (
    <FlatList
      style={tw`h-full`}
      data={matches}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ChatRowComp matchDetails={item} />}
    />
  ) : (
    <View style={tw`p-5`}>
      <Text style={tw`text-center text-lg`}>No matches at the moment 😢</Text>
    </View>
  );
};

export default ChatListComp;
