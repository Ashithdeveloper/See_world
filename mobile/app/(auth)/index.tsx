
import { useSocialAuth } from "@/hooks/useSocialAuth";
import { LinearGradient } from "expo-linear-gradient";
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const {isLoading , handleSocialAuth} = useSocialAuth();
  return (
    <LinearGradient
      colors={["#ffffff", "#ffffff", "#22c55e"]}
      locations={[0, 0.6, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      className="flex-1"
    >
      <View className="flex-1 px-8 justify-between">
        <View className="flex-1 justify-center  ">
          {/**Domo image */}
          <View className="items-center mb-5 ">
            <Image
              source={require("../../assets/images/seeworld.png")}
              className="size-96 "
              resizeMode="contain"
            />
          </View>
          <View className="flex-col gap-2">
            <TouchableOpacity
              className="flex-row items-center justify-center bg-white border border-gray-300 rounded-full py-3 px-6"
              onPress={() => handleSocialAuth("oauth_google")}
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2, // for Android
              }}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#22c55e" />
              ) : (
                <View className="flex-row items-center justify-center">
                  <Image
                    source={require("../../assets/images/google.png")}
                    className="size-10 mr-2"
                    resizeMode="contain"
                  />
                  <Text className="text-black font-medium text-base">
                    Continue with Google
                  </Text>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row items-center justify-center bg-white border border-gray-300 rounded-full py-3 px-6"
              onPress={() => handleSocialAuth("oauth_apple")}
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2, // for Android
              }}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#22c55e" />
              ) : (
                <View className="flex-row items-center justify-center">
                  <Image
                    source={require("../../assets/images/apple.png")}
                    className="size-8 mr-2"
                    resizeMode="contain"
                  />
                  <Text className="text-black font-medium text-base">
                    Continue with Apple
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          {/* Terms and Privacy */}
          <Text className="text-center text-gray-500 text-xs leading-4 mt-6 px-2">
            By signing up, you agree to our{" "}
            <Text className="text-blue-500">Terms</Text>
            {", "}
            <Text className="text-blue-500">Privacy Policy</Text>
            {", and "}
            <Text className="text-blue-500">Cookie Use</Text>.
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}
