import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export async function generateMetadata() {
  return {
    title: "HexaFlow | Software Solutions Studio",
    description: "Transforming ideas into runtime solutions",
    openGraph: {
      title: "HexaFlow | Software Solutions Studio",
      description: "Transforming ideas into runtime solutions",
      url: "https://hexaflow.dev",
      siteName: "HexaFlow",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
        },
      ],
      locale: "en",
      type: "website",
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
