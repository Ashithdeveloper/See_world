import {  Stack } from "expo-router";
import "../global.css";
import { SafeAreaView } from "react-native-safe-area-context";
import { QueryClient , QueryClientProvider } from "@tanstack/react-query"



// GoogleSignin.configure({
//   webClientId:
//     "1057480029346-9bbqd1l82t5v72ddj1jfgheq5n9f0528.apps.googleusercontent.com",
// });

export default function RootLayout() {

  // tanstack query client setup
  const queryClient = new QueryClient();


  return (
   
      <QueryClientProvider client={queryClient}>
        <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
          </Stack>
        </SafeAreaView>
      </QueryClientProvider>

  );
}
