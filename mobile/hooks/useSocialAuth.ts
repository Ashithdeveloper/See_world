import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { makeRedirectUri } from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

export const useSocialAuth = () => {
  const [userInfo, setUserInfo] = useState<any>(null);

  const isDevelopment = __DEV__; // Detect development mode

  const redirectUri = isDevelopment
    ? "https://auth.expo.io/@ashith.s.f/mobile"
    : makeRedirectUri({ scheme: "mobile" }); // Custom scheme for standalone builds

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "1057480029346-c1bf5goo4e73hkf5lubke33biif12bq7.apps.googleusercontent.com",
    redirectUri,
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;

      fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${id_token}` },
      })
        .then((res) => res.json())
        .then((user) => {
          setUserInfo(user);
          console.log("Google user info", user);
        })
        .catch((err) => console.error("Failed to fetch user info:", err));
    } else if (response?.type === "error") {
      Alert.alert("Google login failed");
    }
  }, [response]);

  return {
    signIn: () => promptAsync(), // Trigger Google auth flow
    userInfo,
  };
};
