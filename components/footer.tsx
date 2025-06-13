"use client"

import { useTranslations } from "next-intl"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeLogo } from "./theme-logo"
import { Github, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  const t = useTranslations()
  const pathname = usePathname()
  const isEnglish = !pathname.startsWith("/fr")

  return (
    <footer className="bg-background border-t py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <ThemeLogo width={30} height={30} className="mr-2" />
            <span className="font-mono text-lg font-bold">HexaFlow_</span>
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <nav className="flex space-x-6">
              <Link
                href={isEnglish ? "/" : "/fr"}
                className="text-sm text-foreground/70 hover:text-primary transition-colors"
              >
                {t("navigation.home")}
              </Link>
              <Link
                href={isEnglish ? "/services" : "/fr/services"}
                className="text-sm text-foreground/70 hover:text-primary transition-colors"
              >
                {t("navigation.services")}
              </Link>
              <Link
                href={isEnglish ? "/about" : "/fr/about"}
                className="text-sm text-foreground/70 hover:text-primary transition-colors"
              >
                {t("navigation.about")}
              </Link>
              <Link
                href={isEnglish ? "/contact" : "/fr/contact"}
                className="text-sm text-foreground/70 hover:text-primary transition-colors"
              >
                {t("navigation.contact")}
              </Link>
            </nav>

            <div className="flex space-x-4">
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-5 w-5 text-foreground/70 hover:text-primary transition-colors" />
              </Link>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 text-foreground/70 hover:text-primary transition-colors" />
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-foreground/70 hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-foreground/60">{t("footer.copyright")}</div>
      </div>
    </footer>
  )
}
