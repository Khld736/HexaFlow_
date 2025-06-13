// components/theme-logo.tsx
"use client"

import { useTheme } from "next-themes"
import Image from "next/image"
import { useState, useEffect } from "react"

export function ThemeLogo({ width = 80, height = 80, className = "" }) {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), [])
  
  if (!mounted) {
    // Return a placeholder during SSR
    return <div style={{ width, height }} />
  }
  
  const currentTheme = theme === "system" ? resolvedTheme : theme
  const logoSrc = currentTheme === "dark" 
    ? "/logo-hexaflow-dark.svg" 
    : "/logo-hexaflow-light.svg"
  
  return (
    <Image 
      src={logoSrc || "/placeholder.svg"} 
      alt="HexaFlow Logo" 
      width={width} 
      height={height}
      className={className} 
    />
  )
}