"use client"

import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/i18n"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"

const cards = [
  {
    image: "/images/target-students.jpg",
    titleKey: "targetStudents" as const,
    descKey: "targetStudentsDesc" as const,
  },
  {
    image: "/images/target-schoolkids.jpg",
    titleKey: "targetSchoolkids" as const,
    descKey: "targetSchoolkidsDesc" as const,
  },
  {
    image: "/images/target-office.jpg",
    titleKey: "targetOffice" as const,
    descKey: "targetOfficeDesc" as const,
  },
]

export function WhoIsItFor() {
  const { language } = useLanguage()
  const t = translations[language]
  const { ref, isVisible } = useAnimateOnScroll()

  return (
    <section id="who" className="py-20 md:py-28" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {t.whoIsItFor}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            {t.whoIsItForTitle}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            {t.whoIsItForSubtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <div
              key={card.titleKey}
              className={`group relative rounded-3xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-2 ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${(i + 1) * 150}ms` }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={card.image}
                  alt={t[card.titleKey]}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {t[card.titleKey]}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t[card.descKey]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
