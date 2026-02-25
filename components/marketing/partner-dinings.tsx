"use client"

import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/i18n"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

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
  const [ref, isVisible] = useScrollAnimation()

  return (
    <section id="partners" className="py-20 md:py-28">
      <div ref={ref} className="container mx-auto px-4 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            {t.partnersTitle}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            {t.partnersSubtitle}
          </h2>
        </div>

        <div
          className={`flex flex-wrap justify-center items-center gap-8 md:gap-14 lg:gap-16 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {partners.map((partner, i) => (
            <div
              key={partner.id}
              className="group flex flex-col items-center transition-all duration-500"
              style={{ transitionDelay: isVisible ? `${i * 100}ms` : "0ms" }}
            >
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-background flex items-center justify-center shadow-md border border-border overflow-hidden transition-all duration-500 group-hover:shadow-xl group-hover:shadow-primary/10 group-hover:scale-110 group-hover:border-primary/30">
                <img
                  src={partner.logo || "/placeholder.svg"}
                  alt={`${partner.name} logo`}
                  className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-xl transition-all duration-300"
                />
              </div>
              <span className="mt-4 text-sm font-medium text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:font-semibold">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
