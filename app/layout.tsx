import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ClientProvider from "./clientProvider";
import Header from "@/components/Layout/Header";
import { NavigationProgress } from "@/components/Tools/NavigationProgress";
import { ToastProvider } from "@heroui/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "دیباگچی",
  description: "برای تمام برنامه نویسان توسعه دهنده دانشجویان سرمایه گذاران",
  icons: {
    icon: "/vercel.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased mx-auto`}
      >
        <NavigationProgress />
        <ClientProvider>
          <ToastProvider placement="top-center" />
          {children}

          {/* <Toaster position="top-center" richColors /> */}
        </ClientProvider>
      </body>
    </html>
  );
}
