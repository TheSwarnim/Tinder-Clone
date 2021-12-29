import React, { createContext, useContext } from "react";
import * as Google from "expo-google-app-auth";
import {
  GoogleAuthProvider,
  signInWithCredential,
  onAuthStateChanged,
  signOut,
} from "@firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext({
  // initial state of context
});

const config = {
  androidClientId:
    "328481382959-5ig02c7tvjrvepd79q23dkisbvoh551c.apps.googleusercontent.com",
  iosClientId:
    "328481382959-j1ohkurd8nc6qo70inughkc1r5r7ujpn.apps.googleusercontent.com",
  scopes: ["profile", "email"],
  permissions: ["public_profile", "email", "gender", "location"],
};

export const AuthProvider = ({ children }) => {
  const signInWithGoogle = async () => {
    await Google.logInAsync(config).then(async (logInResult) => {
      if (logInResult.type === "success") {
        // login...
        const { idToken, accessToken } = logInResult;
        const credential = GoogleAuthProvider.credential(idToken, accessToken);

        await signInWithCredential(auth, credential);
      }

      return Promise.reject();
    });
  };

  return (
    <AuthContext.Provider value={{ user: null, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
