import { Header } from "@/components/marketing/header"
import { Hero } from "@/components/marketing/hero"
import { HowItWorks } from "@/components/marketing/how-it-works"
import { Postamat } from "@/components/marketing/postamat"
import { PartnerDinings } from "@/components/marketing/partner-dinings"
import { Testimonials } from "@/components/marketing/testimonials"
import { Pricing } from "@/components/marketing/pricing"
import { FAQ } from "@/components/marketing/faq"
import { CTA } from "@/components/marketing/cta"
import { Footer } from "@/components/marketing/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Postamat />
        <PartnerDinings />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
