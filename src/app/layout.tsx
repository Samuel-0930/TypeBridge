import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TypeBridge | MBTI 연애 가이드 & AI 상담",
  description: "좋아하는 사람의 MBTI로 호감도를 분석하고 맞춤형 연애 전략을 받아보세요.",
  openGraph: {
    title: "TypeBridge | MBTI 연애 가이드",
    description: "MBTI 기반 맞춤 연애 가이드 및 AI 채팅 상담 서비스",
    url: "https://type-bridge.vercel.app",
    siteName: "TypeBridge",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </head>
      <body className={`${outfit.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
