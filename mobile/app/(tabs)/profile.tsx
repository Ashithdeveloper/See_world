import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const posts = [
  "https://picsum.photos/300?1",
  "https://picsum.photos/300?2",
  "https://picsum.photos/300?3",
  "https://picsum.photos/300?4",
  "https://picsum.photos/300?5",
  "https://picsum.photos/300?6",
];

export default function Profile() {
  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 pt-12">
        <Text className="text-2xl font-bold">ashith_sf</Text>
      </View>

      {/* Profile Info */}
      <View className="flex-row items-center px-4 mt-5">
        <Image
          source={{
            uri: "https://i.pravatar.cc/300",
          }}
          className="w-24 h-24 rounded-full"
        />

        <View className="flex-1 flex-row justify-around ml-4">
          <View className="items-center">
            <Text className="font-bold text-lg">25</Text>
            <Text>Posts</Text>
          </View>

          <View className="items-center">
            <Text className="font-bold text-lg">1.2K</Text>
            <Text>Followers</Text>
          </View>

          <View className="items-center">
            <Text className="font-bold text-lg">320</Text>
            <Text>Following</Text>
          </View>
        </View>
      </View>

      {/* Bio */}
      <View className="px-4 mt-4">
        <Text className="font-bold">Ashith S F</Text>
        <Text className="text-gray-600">
          Full Stack Developer 🚀
        </Text>
        <Text className="text-gray-600">
          MERN | React Native | Next.js
        </Text>
      </View>

      {/* Buttons */}
      <View className="flex-row px-4 mt-4 gap-2">
        <TouchableOpacity className="flex-1 border border-gray-300 rounded-lg py-2">
          <Text className="text-center font-medium">
            Edit Profile
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-1 border border-gray-300 rounded-lg py-2">
          <Text className="text-center font-medium">
            Share Profile
          </Text>
        </TouchableOpacity>
      </View>

      {/* Highlights */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mt-6 px-4"
      >
        {[1, 2, 3, 4, 5].map((item) => (
          <View key={item} className="items-center mr-5">
            <View className="w-16 h-16 rounded-full border border-gray-300 justify-center items-center">
              <Text>+</Text>
            </View>
            <Text className="mt-1 text-xs">Story</Text>
          </View>
        ))}
      </ScrollView>

      {/* Posts Grid */}
      <View className="mt-6">
        <FlatList
          data={posts}
          numColumns={3}
          scrollEnabled={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              style={{
                width: width / 3,
                height: width / 3,
              }}
            />
          )}
        />
      </View>
    </ScrollView>
  );
}