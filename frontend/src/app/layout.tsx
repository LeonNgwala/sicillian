import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import NavigationProgress from "@/components/NavigationProgress";

const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkillsGrid — Connecting Skills to Opportunity",
  description:
    "A centralised digital ecosystem connecting learners, institutions, employers, SETAs, and incubators across the Eastern Cape through AI-powered skills matching.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} scroll-smooth`}>
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <NavigationProgress />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
