"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X } from "lucide-react"
import { ThemeLogo } from "./theme-logo"
import { useTranslations } from "next-intl"

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const t = useTranslations()

  const isEnglish = !pathname.startsWith("/fr")

  useEffect(() => {
    setMounted(true)
  }, [])

  // Create paths for language switching
  const getEnglishPath = () => {
    if (isEnglish) return pathname // Already in English
    return pathname.replace(/^\/fr/, "") || "/"
  }

  const getFrenchPath = () => {
    if (!isEnglish) return pathname // Already in French
    return `/fr${pathname === "/" ? "" : pathname}`
  }

  const navItems = [
    { href: isEnglish ? "/" : "/fr", label: t("navigation.home") },
    { href: isEnglish ? "/services" : "/fr/services", label: t("navigation.services") },
    { href: isEnglish ? "/about" : "/fr/about", label: t("navigation.about") },
    { href: isEnglish ? "/contact" : "/fr/contact", label: t("navigation.contact") },
  ]

  return (
    <header className="fixed w-full bg-background/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={isEnglish ? "/" : "/fr"} className="flex items-center">
          <ThemeLogo width={40} height={40} className="mr-2" />
          <span className="font-mono text-xl font-bold">HexaFlow_</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === item.href ? "text-primary" : "text-foreground/70"
              }`}
            >
              {item.label}
            </Link>
          ))}

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {mounted && theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <div className="flex space-x-1 border rounded-md">
              <Link href={getEnglishPath()}>
                <div
                  className={`px-3 py-1 text-sm font-mono ${isEnglish ? "bg-primary text-primary-foreground" : "hover:text-primary"}`}
                >
                  EN
                </div>
              </Link>
              <Link href={getFrenchPath()}>
                <div
                  className={`px-3 py-1 text-sm font-mono ${!isEnglish ? "bg-primary text-primary-foreground" : "hover:text-primary"}`}
                >
                  FR
                </div>
              </Link>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {mounted && theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <div className="flex space-x-1 border rounded-md">
            <Link href={getEnglishPath()}>
              <div
                className={`px-3 py-1 text-sm font-mono ${isEnglish ? "bg-primary text-primary-foreground" : "hover:text-primary"}`}
              >
                EN
              </div>
            </Link>
            <Link href={getFrenchPath()}>
              <div
                className={`px-3 py-1 text-sm font-mono ${!isEnglish ? "bg-primary text-primary-foreground" : "hover:text-primary"}`}
              >
                FR
              </div>
            </Link>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === item.href ? "text-primary" : "text-foreground/70"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
