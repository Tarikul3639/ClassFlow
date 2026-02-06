"use client";

import { useEffect } from "react";
import { registerServiceWorker } from "@/lib/pwa";

export function PWAProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Register service worker only in production or when explicitly testing PWA
    if (process.env.NODE_ENV === "production" || process.env.NEXT_PUBLIC_ENABLE_PWA === "true") {
      registerServiceWorker();
    }
  }, []);

  return <>{children}</>;
}
