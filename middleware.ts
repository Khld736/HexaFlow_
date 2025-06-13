import createMiddleware from "next-intl/middleware"
import type { NextRequest } from "next/server"

// Create the middleware for internationalization
const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "fr"],

  // The default locale to use when a locale is not found
  defaultLocale: "en",

  // Paths that don't require locale prefix (e.g. /about instead of /en/about)
  localePrefix: "as-needed",
})

// Export the middleware function
export default function middleware(request: NextRequest) {
  return intlMiddleware(request)
}

// Configure the matcher for the middleware
export const config = {
  // Match all paths except for:
  // - API routes (/api/*)
  // - Next.js internal routes (/_next/*)
  // - Vercel internal routes (/_vercel/*)
  // - Files with extensions (e.g. /favicon.ico)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}
