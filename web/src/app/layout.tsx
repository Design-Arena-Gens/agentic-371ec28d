import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FluxWatch • Streamlined Watch Planner",
  description:
    "Track watched shows and films, stay ahead of upcoming releases, and get tailored suggestions in a cinematic dark interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-base text-text`}>
        {children}
      </body>
    </html>
  );
}
