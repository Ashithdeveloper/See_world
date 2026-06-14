import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useApiClient, useApi } from "../utils/api";

export const useUserSync = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const api = useApiClient();
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState<Error | null>(null);
  const [isSynced, setIsSynced] = useState(false);

  useEffect(() => {
    const sync = async () => {
      if (!isLoaded || !isSignedIn || !user || isSynced || isSyncing) return;

      setIsSyncing(true);
      try {
        await useApi.syncUser(api);
        setIsSynced(true);
        console.log("User synced successfully with MongoDB");
      } catch (err: any) {
        // 409 status means the user already exists in MongoDB, which is expected on subsequent logins.
        if (err?.response?.status === 409) {
          setIsSynced(true);
          console.log("User already exists in MongoDB");
        } else {
          console.error("Failed to sync user with MongoDB:", err);
          setSyncError(err);
        }
      } finally {
        setIsSyncing(false);
      }
    };

    sync();
  }, [isSignedIn, isLoaded, user, isSynced, isSyncing, api]);

  return { isSyncing, syncError, isSynced };
};
