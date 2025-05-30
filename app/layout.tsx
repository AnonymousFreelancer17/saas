import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import AppLayout from "./app_layout";
import { ThemeProvider } from "@/components/Theme/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from '@clerk/themes';

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gitti",
  description: "The OG project management app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
     appearance={{ baseTheme: dark }}
    >
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${bricolage.variable} antialiased w-screen hscreen flex justify-center items-center overflow-hidden`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AppLayout>{children}</AppLayout>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
