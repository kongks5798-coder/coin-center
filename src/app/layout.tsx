import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "@/components/layout/SiteShell";
import { AdminWidget } from "@/components/kaus/AdminWidget";

export const metadata: Metadata = {
  title: "FIELD NINE · KAUS",
  description: "Physical AI Computing Infrastructure for Real-World Assets · FIELD NINE & KAUS",
  keywords: ["FIELD NINE", "NEXUS OS", "KAUS Coin", "AI 물류", "드론 네트워크", "블록체인", "양자 블록체인", "FILLUMINATE", "MARD MARD"],
  authors: [{ name: "FIELD NINE" }],
  creator: "FIELD NINE",
  publisher: "FIELD NINE Corporation",
  metadataBase: new URL('https://www.fieldnine.io'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "FIELD NINE - AI 기반 물류 자동화 플랫폼",
    description: "AI, 드론, 블록체인으로 전 세계를 연결하는 혁신 플랫폼",
    url: "https://www.fieldnine.io",
    siteName: "FIELD NINE",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FIELD NINE - 미래를 만드는 기술",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FIELD NINE - AI 기반 물류 자동화 플랫폼",
    description: "AI, 드론, 블록체인으로 전 세계를 연결하는 혁신 플랫폼",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#00FF94" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="KAUS" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
      </head>
      <body>
        <SiteShell>{children}</SiteShell>
        <AdminWidget />
      </body>
    </html>
  );
}

