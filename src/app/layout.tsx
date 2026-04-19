import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { itIT } from "@clerk/localizations";
import Head from "next/head";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/context/LangContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GSA Hotels",
  description: "The Art of Hosting",
};

import Cursor from "@/components/Cursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={itIT}>
      <html lang="it" className={`${geistSans.variable} ${geistMono.variable}`}>
        <body>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
          />
          <LangProvider>
            <Cursor />
            {children}
          </LangProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
