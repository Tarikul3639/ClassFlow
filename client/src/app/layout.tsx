import type { Metadata } from "next";

// All Providers
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "ClassFlow",
  description: "Managed your classes with ease.",
  manifest: "/manifest.json",
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
      <body className={`antialiased font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
