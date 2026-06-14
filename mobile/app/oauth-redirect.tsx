import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function OAuthRedirectHandler() {
  // Expo Router handles the deep link here. 
  // Redirect users back to your main application layout/dashboard.
  return <Redirect href="/" />;
}