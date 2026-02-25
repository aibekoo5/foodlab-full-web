import { Header } from "@/components/marketing/header"
import { Hero } from "@/components/marketing/hero"
import { TargetAudience } from "@/components/marketing/target-audience"
import { NewsBanner } from "@/components/marketing/news-banner"
import { HowItWorks } from "@/components/marketing/how-it-works"
import { PartnerDinings } from "@/components/marketing/partner-dinings"
import { Pricing } from "@/components/marketing/pricing"
import { Testimonials } from "@/components/marketing/testimonials"
import { FAQ } from "@/components/marketing/faq"
import { CTA } from "@/components/marketing/cta"
import { Footer } from "@/components/marketing/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <TargetAudience />
        <NewsBanner />
        <HowItWorks />
        <PartnerDinings />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
