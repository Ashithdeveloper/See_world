import axios, { AxiosInstance } from "axios";
import { useAuth } from "@clerk/clerk-expo";
import { Platform } from "react-native";
import { useMemo } from "react";
import Constants from "expo-constants";

const getApiUrl = () => {
  // 1. Prioritize explicitly defined environment variables (Production/Staging)
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }

  // 2. Development fallbacks for local server setups
  if (__DEV__) {
    const hostUri = Constants.expoConfig?.hostUri;
    
    if (hostUri) {
      // Splits '192.168.1.3:8081' into ['192.168.1.3', '8081']
      const ip = hostUri.split(":")[0];
      // ✅ Dynamically returns 'http://192.168.1.3:5000' for physical devices and simulators
      return `http://${ip}:5000`; 
    }
    
    // Fallback if hostUri isn't detected (e.g., standard emulator connections)
    return Platform.OS === "android"
      ? "http://10.0.2.2:5000"
      : "http://localhost:5000";
  }

  return "http://localhost:5000"; // Default production fallback
};

export const API_URL = getApiUrl();
console.log("[API Client] Connected to Base URL:", API_URL); // Useful for debugging connection drops

export const createApiClient = (
  getToken: () => Promise<string | null>
): AxiosInstance => {
  const api = axios.create({
    baseURL: API_URL,
  });

  api.interceptors.request.use(async (config) => {
    try {
      const token = await getToken();
      console.log("token " ,token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error retrieving Clerk token for API client:", error);
    }
    return config;
  });

  return api;
};

export const useApiClient = (): AxiosInstance => {
  const { getToken } = useAuth();
  return useMemo(() => createApiClient(getToken), [getToken]);
};

export const useApi = {
  syncUser: (api: AxiosInstance) => api.post("/api/users/sync"),
  getCurrentUser: (api: AxiosInstance) => api.get("/api/users/me"),
  updateProfile: (api: AxiosInstance, data: any) =>
    api.put("/api/users/update", data),
};