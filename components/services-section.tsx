"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { Globe, Smartphone, Cog, Database, PenTool, Code } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const services = [
    {
      title: "Web Development",
      icon: Globe,
      description: "Modern, responsive websites built with the latest technologies.",
    },
    {
      title: "Mobile App Development",
      icon: Smartphone,
      description: "Native and cross-platform mobile applications for iOS and Android.",
    },
    {
      title: "Automation",
      icon: Cog,
      description: "Streamline your workflows with custom automation solutions.",
    },
    {
      title: "AI & Data Analytics",
      icon: Database,
      description: "Leverage AI and data analytics to gain valuable insights.",
    },
    {
      title: "Design",
      icon: PenTool,
      description: "Eye-catching designs that communicate your brand effectively.",
    },
    {
      title: "Custom Software",
      icon: Code,
      description: "Tailored software solutions to address your unique challenges.",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section className="py-20 px-4" ref={ref}>
      <div className="container mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          Our Services
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={item} className="service-card">
              <Card className="h-full border border-border hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div className="p-2 rounded-md bg-primary/10">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
