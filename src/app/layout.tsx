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
import Footer from "@/components/Footer";
import LegalModals from "@/components/LegalModals";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={itIT}>
      <html lang="it" className={`${geistSans.variable} ${geistMono.variable} loading`}>
        <body className="antialiased loading" suppressHydrationWarning>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          />
          <LangProvider>
            <Cursor />
            {children}
            <Footer />
            <LegalModals />
          </LangProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
