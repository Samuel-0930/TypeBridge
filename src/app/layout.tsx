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
  metadataBase: new URL("https://type-bridge.vercel.app"),
  title: "TypeBridge | MBTI 연애 가이드 & AI 상담",
  description: "좋아하는 사람의 MBTI로 호감도를 분석하고 나만의 맞춤형 연애 전략을 받아보세요. 1020 세대를 위한 힙한 연애 지침서!",
  keywords: ["MBTI 연애", "연애 가이드", "MBTI 궁합", "연애 상담", "TypeBridge", "타입브릿지", "심리 분석"],
  openGraph: {
    title: "TypeBridge | MBTI 연애 가이드 & 시너지 분석",
    description: "MBTI로 꿰뚫어 보는 그 사람의 속마음 💘 나만의 맞춤형 연애 전략 가이드",
    url: "https://type-bridge.vercel.app",
    siteName: "TypeBridge",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TypeBridge - MBTI Dating Strategy",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TypeBridge | MBTI 연애 가이드",
    description: "MBTI로 분석하는 고도의 연애 전략",
    images: ["/og-image.png"],
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
