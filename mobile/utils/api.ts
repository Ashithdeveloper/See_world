import axios ,{ AxiosInstance } from "axios";
import { useAuth } from '@clerk/clerk-expo'


const API_URL = "https://see-world.onrender.com";

export const createApiClient = (getToken:() => Promise<string | null>):AxiosInstance =>{
    const api = axios.create({
        baseURL: API_URL,
    });

   
  api.interceptors.request.use(async (config) => {
      const token = await getToken(); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
    return api;
}
export const useApiClient = ():AxiosInstance =>{
    const { getToken } = useAuth();
    return createApiClient(getToken);
}

export const useApi = {
  syncUser: (api: AxiosInstance) => api.post("/api/users/sync"),
  getCurrentUser: (api: AxiosInstance) => api.get("/api/users/me"),
  updateProfile: (api: AxiosInstance, data: any) =>
    api.put("/api/users/update", data),
};