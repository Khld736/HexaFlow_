"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { ThemeLogo } from "./theme-logo"
import { useTranslations } from "next-intl"

export default function Hero() {
  const t = useTranslations()
  const [typedText, setTypedText] = useState("")
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const tagline = t("hero.tagline")
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex < tagline.length) {
        setTypedText(tagline.substring(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(typingInterval)
        setIsTypingComplete(true)
      }
    }, 100)

    return () => clearInterval(typingInterval)
  }, [tagline])

  const scrollToNextSection = () => {
    const nextSection = sectionRef.current?.nextElementSibling
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="relative h-screen flex items-center justify-center">
      <div className="hex-grid" aria-hidden="true"></div>

      <motion.div
        ref={sectionRef}
        className="text-center z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex justify-center mb-6">
          <ThemeLogo width={80} height={80} />
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          HexaFlow_
          <span className="cursor-blink">|</span>
        </h1>

        <div className="h-8">
          <p className="text-xl md:text-2xl font-mono text-primary">{typedText}</p>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <button
          onClick={scrollToNextSection}
          className="flex items-center justify-center p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
          aria-label="Scroll down"
        >
          <ChevronDown className="h-6 w-6 text-primary animate-bounce" />
        </button>
      </motion.div>
    </div>
  )
}
