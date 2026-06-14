import { TouchableOpacity, Alert } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "@clerk/clerk-expo";

export default function SignOutButton() {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Sign out failed:", error);
      Alert.alert("Sign Out Error", "Failed to sign out. Please try again.");
    }
  };

  return (
    <TouchableOpacity onPress={handleSignOut}>
      <Feather name="log-out" size={30} color="red" />
    </TouchableOpacity>
  );
}