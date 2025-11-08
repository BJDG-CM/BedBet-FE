import { Stack } from "expo-router";
import React, { createContext, useContext, useState } from "react";

export type AuthContextType = {
  loggedIn: boolean;
  login: () => void;
  logout: () => void;
  user?: {
    name: string;
    email: string;
    bank: string;
    account_number: string;
    coin: Int32Array;
  };
};

const AuthContext = createContext<AuthContextType | null>(null);
export const useAuth = () => useContext(AuthContext)!;

export default function RootLayout() {
  const [loggedIn, setLoggedIn] = useState(false);
  const initialRoute = loggedIn ? "(tabs)" : "(auth)/firstpage";

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        login: () => setLoggedIn(true),
        logout: () => setLoggedIn(false),
      }}
    >
      <Stack
        screenOptions={{ headerShown: false }}
        initialRouteName={initialRoute}
      >
        <Stack.Screen name="(auth)/firstpage" />
        <Stack.Screen name="(auth)/login" />
        <Stack.Screen name="(auth)/signup" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </AuthContext.Provider>
  );
}
