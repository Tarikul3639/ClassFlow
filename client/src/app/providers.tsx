"use client";
import { Toaster } from "sonner";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/redux/store";
// import { InstallPWA } from "@/components/pwa/InstallPWA";
import "./globals.css";
// import { OnlineStatusIndicator } from "@/components/ui/OnlineStatusIndicator";
import { PWAProvider } from "@/components/pwa/PWAProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <PWAProvider>
        {children}
        <Toaster />
        {/* <OnlineStatusIndicator /> */}
        {/* <InstallPWA /> */}
      </PWAProvider>
    </ReduxProvider>
  );
}
