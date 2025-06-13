"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useTranslations } from "next-intl"

export default function AboutSection() {
  const t = useTranslations()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const process = [
    {
      title: t("about.process.discover"),
      description: t("about.process.discoverDesc"),
    },
    {
      title: t("about.process.design"),
      description: t("about.process.designDesc"),
    },
    {
      title: t("about.process.build"),
      description: t("about.process.buildDesc"),
    },
    {
      title: t("about.process.iterate"),
      description: t("about.process.iterateDesc"),
    },
  ]

  return (
    <section className="py-20 px-4 bg-muted/30" ref={ref}>
      <div className="container mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {t("about.title")}
        </motion.h2>

        <motion.p
          className="text-lg text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {t("about.mission")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-center mb-10">{t("about.process.title")}</h3>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/30"></div>

            {/* Timeline items */}
            {process.map((step, index) => (
              <motion.div
                key={index}
                className="relative mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <div className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary"></div>

                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8"}`}>
                    <h4 className="text-xl font-bold text-primary mb-2">{step.title}</h4>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>

                  {/* Empty space */}
                  <div className="w-5/12"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
