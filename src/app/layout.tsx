import type React from "react"
import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { AdminWidget } from "@/components/kaus/AdminWidget"

// Using Inter font for Tesla-like clean typography
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "FieldNine | AI-Powered Business Ecosystem | 넥서스 더 필드나인",
  description:
    "AI 물류, 풀필먼트, 브랜드, 패션 사업을 선도하는 대한민국의 혁신 기업. KAUS AI와 KAUS Coin으로 미래를 만듭니다.",
  keywords: [
    "FieldNine",
    "넥서스 더 필드나인",
    "KAUS AI",
    "KAUS Coin",
    "AI 물류",
    "RFID",
    "풀필먼트",
    "블록체인",
    "물류 자동화",
    "DePIN",
    "RWA",
  ],
  authors: [{ name: "FieldNine" }],
  creator: "FieldNine",
  publisher: "FieldNine Corporation",
  metadataBase: new URL("https://www.fieldnine.io"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://www.fieldnine.io",
    siteName: "FieldNine",
    title: "FieldNine | AI-Powered Business Ecosystem",
    description: "AI 물류, 풀필먼트, 브랜드, 패션 사업을 선도하는 대한민국의 혁신 기업",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FieldNine - AI-Powered Business Ecosystem",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FieldNine | AI-Powered Business Ecosystem",
    description: "AI 물류, 풀필먼트, 브랜드, 패션 사업을 선도하는 대한민국의 혁신 기업",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className="dark">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#4F46E5" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="K-TAG ST" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <AdminWidget />
      </body>
    </html>
  )
}
