import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-expo";
import { useMutation } from "@tanstack/react-query";
import { useApi, useApiClient } from "@/utils/api";


export const useUserSync = () => {
    const { isSignedIn } = useAuth();
    const api = useApiClient();

    const syncUserMutation = useMutation({
      mutationFn: () => useApi.syncUser(api), // call the function, not a hook
      onSuccess: (response: any) => {
        console.log("✅ Successfully login", response);
      },
      onError: (error: any) => {
        console.log("❌ Error login", error);
      },
    });

    //Auto sync user when signed in
    useEffect(() => {
        //if user is signed in
      if (isSignedIn && !syncUserMutation.data) {
        syncUserMutation.mutate();
      }
    }, [isSignedIn]);
    return null
}