import { useAuth } from "@clerk/clerk-expo";

export const useSignOut = () => {
  const { signOut } = useAuth();
  return signOut;
};
