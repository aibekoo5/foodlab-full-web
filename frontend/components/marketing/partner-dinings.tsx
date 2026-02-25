"use client"

import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/i18n"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"

const partners = [
  { id: "partner-1", name: "Narxoz", logo: "/logos/narxoz.png" },
  { id: "partner-2", name: "Qaganat", logo: "/logos/qaganat.png" },
  { id: "partner-3", name: "Tagam", logo: "/logos/tagam.png" },
  { id: "partner-4", name: "Keremet food", logo: "/logos/keremet.jpg" },
  { id: "partner-5", name: "Meiman Group", logo: "/logos/meiman.jpg" },
]

export function PartnerDinings() {
  const { language } = useLanguage()
  const t = translations[language]
  const { ref, isVisible } = useAnimateOnScroll()

  return (
    <section id="partners" className="py-20 md:py-28 bg-accent/30" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {t.partnersTitle}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            {t.partnersSubtitle}
          </h2>
        </div>

        {/* Infinite scrolling marquee */}
        <div className={`overflow-hidden ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
          <div className="flex animate-marquee gap-12 items-center">
            {[...partners, ...partners].map((partner, i) => (
              <div
                key={`${partner.id}-${i}`}
                className="flex flex-col items-center gap-4 shrink-0"
              >
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-card border border-border shadow-sm flex items-center justify-center overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-full"
                  />
                </div>
                <span className="text-sm font-medium text-muted-foreground">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
