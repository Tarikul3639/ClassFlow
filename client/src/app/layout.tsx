import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

// Configure Manrope font
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "ClassFlow - Admin Panel",
  description: "Managed by Nexion Standard Design System",
  icons: {
    icon: [
      { url: "/favicon.svg" }, // Legacy support
      { url: "/icon.png", sizes: "100x100", type: "image/png" }, // Android
    ],
    // apple: [
    //   { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }, // iOS
    // ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${manrope.variable} antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}
