import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";


import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Jots",
  description: "Level up your engineering skills. Every day.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <html lang="en">
      <body className={`${jetBrainsMono.className} antialiased`}>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
        <Analytics />
      </body>
    </html>
  );
}
