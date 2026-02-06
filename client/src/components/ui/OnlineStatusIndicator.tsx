"use client";

import { Wifi, WifiOff } from "lucide-react";
import { useEffect, useState } from "react";

export const OnlineStatusIndicator = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      setShow(true);
      setTimeout(() => setShow(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShow(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Offline thakle shob shomoy dekhabe, online hole 3s por chole jabe
  // if (!show && isOnline) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-9999 flex items-center justify-center p-3 rounded-full shadow-2xl transition-all duration-500 backdrop-blur-md border ${
        isOnline
          ? "bg-primary border-primary text-white"
          : "bg-rose-600/90 border-rose-500 text-white"
      }`}
      title={isOnline ? "Online" : "Offline"}
    >
      <div className="flex items-center gap-2">
        {isOnline ? (
          <Wifi size={16} />
        ) : (
          <>
            <WifiOff size={16} className="animate-bounce" />
            <span className="text-xxs font-bold uppercase tracking-wider">
              Offline
            </span>
          </>
        )}
      </div>
    </div>
  );
};
