import Hero from "@/components/hero"
import ServicesSection from "@/components/services-section"
import AboutSection from "@/components/about-section"
import ContactForm from "@/components/contact-form"

export default function LocalizedHome() {
  return (
    <div className="scroll-snap-container">
      <section className="scroll-snap-section">
        <Hero />
      </section>
      <section>
        <ServicesSection />
      </section>
      <section>
        <AboutSection />
      </section>
      <section>
        <ContactForm />
      </section>
    </div>
  )
}
