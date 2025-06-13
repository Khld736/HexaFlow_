"use client"

import { useTranslations } from "next-intl"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { sendContactEmail } from "@/app/actions"
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function ContactForm() {
  const t = useTranslations()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const message = formData.get("message") as string

    try {
      await sendContactEmail({ name, email, message })
      toast({
        title: t("contact.success"),
        duration: 3000,
      })
      formRef.current?.reset()
    } catch (error) {
      toast({
        title: t("contact.error"),
        variant: "destructive",
        duration: 3000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-20 px-4" ref={ref}>
      <div className="container mx-auto max-w-3xl">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {t("contact.title")}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card border rounded-lg p-6 md:p-8 shadow-sm"
        >
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                {t("contact.name")}
              </label>
              <Input id="name" name="name" required className="w-full" />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                {t("contact.email")}
              </label>
              <Input id="email" name="email" type="email" required className="w-full" />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                {t("contact.message")}
              </label>
              <Textarea id="message" name="message" required rows={5} className="w-full" />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : t("contact.submit")}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t text-center">
            <p className="text-muted-foreground mb-2">{t("contact.emailFallback")}</p>
            <a href="mailto:contact@hexaflow.dev" className="inline-flex items-center text-primary hover:underline">
              <Mail className="h-4 w-4 mr-2" />
              contact@hexaflow.dev
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
