import { useEffect, useState } from "react";

export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    window.addEventListener("online", setOnline);
    window.addEventListener("offline", setOffline);

    return () => {
      window.removeEventListener("online", setOnline);
      window.removeEventListener("offlien", setOffline);
    };
  }, []);

  function setOnline() {
    setIsOnline(true);
  }

  function setOffline() {
    setIsOnline(false);
  }

  return isOnline;
};
