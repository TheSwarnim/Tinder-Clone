import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";
import HeaderComp from "../components/HeaderComp";
import { defaultStyle, primaryColor } from "../utils/defaultStyle";
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";
import useAuth from "../hooks/useAuth";
import SenderMessageComp from "../components/SenderMessageComp";
import ReceiverMessageComp from "../components/ReceiverMessageComp";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import getMatchedUserInfo from "../utils/getMatchedUserInfo";

const MessagesScreen = () => {
  const { user } = useAuth();
  const { params } = useRoute();
  const { matchDetails } = params;

  // textinput
  const [input, setInput] = useState("");

  // messages
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "matches", matchDetails.id, "messages"),
        orderBy("timeStamp", "desc")
      ),
      (snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
    );
    return () => {};
  }, []);

  const sendMessage = () => {
    if (input !== "") {
      addDoc(collection(db, "matches", matchDetails.id, "messages"), {
        timeStamp: serverTimestamp(),
        userId: user.uid,
        displayName: user.displayName,
        photoURL: matchDetails.users[user.uid].photoURL,
        message: input,
      });

      setInput("");
    }
  };

  return (
    <SafeAreaView style={[defaultStyle.safeAreaView, tw`flex-1`]}>
      <HeaderComp
        title={getMatchedUserInfo(matchDetails.users, user.uid).displayName}
        callEnabled
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
        style={tw`flex-1`}
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            inverted={-1}
            data={messages}
            style={tw`pl-4`}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) =>
              item.userId === user.uid ? (
                <SenderMessageComp message={item.message} />
              ) : (
                <ReceiverMessageComp
                  message={item.message}
                  photoURL={item.photoURL}
                />
              )
            }
          />
        </TouchableWithoutFeedback>
        <View
          style={tw`bg-white border-t border-gray-200 px-5 py-2 flex-row justify-between items-center`}
        >
          <TextInput
            style={tw`h-10 text-lg flex-1`}
            placeholder="Send Message..."
            value={input}
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity
            style={[
              tw`ml-2 px-3 py-2 rounded-full`,
              { backgroundColor: primaryColor },
            ]}
            onPress={sendMessage}
          >
            <Ionicons name="send-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MessagesScreen;
