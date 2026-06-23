import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";
import ClientLayout from "@/components/layout/AppLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Specfin Technologies | Institutional Hybrid Investment Platform",
    template: "%s | Specfin Technologies",
  },
  description:
    "Specfin Technologies is a hybrid investment platform giving accredited investors access to institutional-grade hedge fund strategies and tokenized real-world assets. Cash or crypto welcome.",
  keywords: [
    "hedge fund",
    "RWA",
    "real world assets",
    "institutional investment",
    "crypto investment",
    "USDT",
    "tokenized assets",
    "Specfin",
  ],
  authors: [{ name: "Specfin Technologies" }],
  creator: "Specfin Technologies",
  metadataBase: new URL("https://specfintec.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://specfintec.com",
    siteName: "Specfin Technologies",
    title: "Specfin Technologies | Institutional Hybrid Investment Platform",
    description:
      "Institutional-grade hedge fund strategies and tokenized real-world assets. One unified platform for cash and crypto investors.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Specfin Technologies | Institutional Hybrid Investment Platform",
    description:
      "Institutional-grade hedge fund strategies and tokenized real-world assets. One unified platform for cash and crypto investors.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersObj = await headers();
  const cookies = headersObj.get("cookie");
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="https://fonts.reown.com/KHTeka-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientLayout cookies={cookies}>{children}</ClientLayout>
      </body>
    </html>
  );
}
