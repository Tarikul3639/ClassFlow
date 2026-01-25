"use client";
import { Toaster } from "sonner";
import { Provider as ReduxProvider } from "react-redux";
import { Manrope } from "next/font/google";
import { store } from "@/redux/store";
import "./globals.css";

// ⚡ Move font to module scope
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <div className={manrope.variable}>
      <ReduxProvider store={store}>
        {children}
        <Toaster />
      </ReduxProvider>
    </div>
  );
}
