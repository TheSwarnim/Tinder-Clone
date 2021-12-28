import React, { createContext, useContext } from "react";
import { View, Text } from "react-native";

const AuthContext = createContext({
  // initial state of context
});

export const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={{ user: null }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
