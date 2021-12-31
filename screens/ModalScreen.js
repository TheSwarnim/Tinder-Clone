import { useNavigation } from "@react-navigation/native";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useLayoutEffect, useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import tw from "twrnc";
import useAuth from "../hooks/useAuth";
import { defaultStyle } from "../utils/defaultStyle";
import { papaImage } from "../utils/images";
import { db } from "../firebase";

const ModalScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  const [image, setImage] = useState(null);
  const [job, setJob] = useState(null);
  const [age, setAge] = useState(null);

  //   const incompleteForm = !image || !job || !age;
  const incompleteForm = !job || !age;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Upload your profile",
      headerStyle: {
        backgroundColor: "#ff5864",
      },
      headerTitleStyle: {
        color: "white",
      },
    });

    return () => {};
  }, []);

  const updateUserProfile = () => {
    setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      job: job,
      age: age,
      timeStamp: serverTimestamp(),
    })
      .then(() => {
        navigation.goBack();
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <View style={[tw`flex-1 items-center pt-1`, defaultStyle.safeAreaView]}>
      <Image
        source={{ uri: papaImage("2pf") }}
        style={tw`h-20 w-full`}
        resizeMode="contain"
      />
      <Text style={tw`text-xl p-2 text-gray-500 font-bold`}>
        Welcome {user.displayName}
      </Text>

      <Text style={tw`p-4 font-bold text-red-400`}>
        Step 1 : The Profile Pic
      </Text>
      <TextInput
        value={image}
        onChangeText={setImage}
        placeholder="Enter a Profile Pic URL"
        style={tw`text-xl pb-2 text-center`}
      />

      <Text style={tw`p-4 font-bold text-red-400`}>Step 2 : The Job</Text>
      <TextInput
        value={job}
        onChangeText={setJob}
        placeholder="Enter a Job"
        style={tw`text-xl pb-2 text-center`}
      />

      <Text style={tw`p-4 font-bold text-red-400`}>Step 3 : The Age</Text>
      <TextInput
        placeholder="Enter your age"
        style={tw`text-xl pb-2 text-center`}
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        maxLength={2}
      />

      <TouchableOpacity
        disabled={incompleteForm}
        style={[
          tw`w-64 p-3 rounded-xl absolute bottom-10`,
          incompleteForm ? tw`bg-gray-400` : tw`bg-red-400`,
        ]}
        activeOpacity={0.5}
        onPress={updateUserProfile}
      >
        <Text style={tw`text-center text-white text-xl`}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalScreen;
