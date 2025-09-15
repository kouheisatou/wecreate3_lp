import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "../components/Header";
import { Breadcrumb } from "../components/Breadcrumb";
import { Footer } from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WeCreate3 - 学生が創るWeb3とメタバースの未来",
  description: "日本最大の学生Web3コミュニティ。Web3とメタバースの認識拡大を目的に活動している学生団体です。",
  keywords: "Web3, メタバース, 学生, コミュニティ, ブロックチェーン, イベント",
  openGraph: {
    title: "WeCreate3 - 学生が創るWeb3とメタバースの未来",
    description: "日本最大の学生Web3コミュニティ。Web3とメタバースの認識拡大を目的に活動している学生団体です。",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@We_Create_3",
    title: "WeCreate3 - 学生が創るWeb3とメタバースの未来",
    description: "日本最大の学生Web3コミュニティ。Web3とメタバースの認識拡大を目的に活動している学生団体です。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col">
          <Header />
          <div className="pt-16">
            <Breadcrumb />
            <main className="flex-1">
              {children}
            </main>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
