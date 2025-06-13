import type React from "react"
import { NextIntlClientProvider } from "next-intl"
import { notFound } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"

const locales = ["en", "fr"]

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> | { locale: string } }) {
  // Await params if it's a promise
  const resolvedParams = await Promise.resolve(params)
  const locale = resolvedParams.locale || "en"

  return {
    title: locale === "en" ? "HexaFlow | Software Solutions Studio" : "HexaFlow | Studio de Solutions Logicielles",
    description:
      locale === "en" ? "Transforming ideas into runtime solutions" : "Transformer des idées en solutions runtime",
    openGraph: {
      title: locale === "en" ? "HexaFlow | Software Solutions Studio" : "HexaFlow | Studio de Solutions Logicielles",
      description:
        locale === "en" ? "Transforming ideas into runtime solutions" : "Transformer des idées en solutions runtime",
      url: "https://hexaflow.dev",
      siteName: "HexaFlow",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
        },
      ],
      locale: locale,
      type: "website",
    },
    metadataBase: new URL("https://hexaflow.dev"),
  }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }> | { locale: string }
}) {
  // Await params if it's a promise
  const resolvedParams = await Promise.resolve(params)
  const locale = resolvedParams.locale

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) notFound()

  // Import the messages for the requested locale
  let messages
  try {
    messages = (await import(`../../messages/${locale}.json`)).default
  } catch (error) {
    notFound()
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Header />
      <main className="flex-grow pt-16">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  )
}
