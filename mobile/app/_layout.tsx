import {  Stack } from "expo-router";
import "../global.css";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { SafeAreaView } from "react-native-safe-area-context";
export default function RootLayout() {

 

  return (
    <ClerkProvider
      tokenCache={tokenCache}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </SafeAreaView>
    </ClerkProvider>
  );
}
