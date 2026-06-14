import { LinearGradient } from "expo-linear-gradient";
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { useCallback, useState } from "react";

export default function Index() {
  const { startOAuthFlow: startGoogleOAuthFlow } = useOAuth({
    strategy: "oauth_google",
  });

  const { startOAuthFlow: startAppleOAuthFlow } = useOAuth({
    strategy: "oauth_apple",
  });

  const [isLoading, setIsLoading] = useState(false);

  const onPressGoogleLogin = useCallback(async () => {
    try {
      setIsLoading(true);

      const redirectUrl = Linking.createURL("oauth-redirect", {
        scheme: "mobile",
      });

      const { createdSessionId, setActive } =
        await startGoogleOAuthFlow({ redirectUrl });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [startGoogleOAuthFlow]);

  const onPressAppleLogin = useCallback(async () => {
    try {
      setIsLoading(true);

      const redirectUrl = Linking.createURL("/", {
        scheme: "mobile",
      });

      const { createdSessionId, setActive } =
        await startAppleOAuthFlow({ redirectUrl });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [startAppleOAuthFlow]);

  return (
    <LinearGradient
      colors={["#ffffff", "#ffffff", "#f8fafc"]}
      style={{ flex: 1 }}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 24,
          justifyContent: "space-between",
          paddingTop: 80,
          paddingBottom: 40,
        }}
      >
        {/* Top Section */}
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/images/seeworld.png")}
            style={{
              width: 180,
              height: 180,
            }}
            resizeMode="contain"
          />

          <Text
            style={{
              fontSize: 40,
              fontWeight: "bold",
              color: "#16a34a",
              marginTop: 10,
            }}
          >
            SeeWorld
          </Text>

          <Text
            style={{
              textAlign: "center",
              color: "#6b7280",
              fontSize: 16,
              marginTop: 12,
              paddingHorizontal: 20,
            }}
          >
            Discover • Connect • Share
          </Text>
        </View>

        {/* Bottom Section */}
        <View>
          <TouchableOpacity
            onPress={onPressGoogleLogin}
            disabled={isLoading}
            style={{
              height: 58,
              borderRadius: 30,
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: "#e5e7eb",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 16,
              elevation: 4,
            }}
          >
            <Image
              source={require("../../assets/images/google.png")}
              style={{ width: 24, height: 24 }}
            />

            <Text
              style={{
                marginLeft: 12,
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              Continue with Google
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onPressAppleLogin}
            disabled={isLoading}
            style={{
              height: 60,
              borderRadius: 30,
              backgroundColor: "#000",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/images/apple.png")}
              style={{
                width: 19,
                height: 24,
                tintColor: "#fff",
                marginRight : 4,
              }}
            />

            <Text
              style={{
                marginLeft: 12,
                fontSize: 16,
                fontWeight: "600",
                color: "#fff",
              }}
            >
              Continue with Apple
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              textAlign: "center",
              marginTop: 24,
              color: "#6b7280",
              fontSize: 12,
              lineHeight: 18,
            }}
          >
            By continuing, you agree to our{" "}
            <Text style={{ color: "#16a34a" }}>
              Terms of Service
            </Text>{" "}
            and{" "}
            <Text style={{ color: "#16a34a" }}>
              Privacy Policy
            </Text>
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}