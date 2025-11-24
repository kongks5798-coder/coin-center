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
  generator: "v0.app",
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
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <AdminWidget />
      </body>
    </html>
  )
}
