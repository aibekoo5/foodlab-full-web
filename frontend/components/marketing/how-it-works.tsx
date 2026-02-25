"use client"

import { UserPlus, CreditCard, UtensilsCrossed, PackageCheck } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/i18n"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"

const icons = [UserPlus, CreditCard, UtensilsCrossed, PackageCheck]

export function HowItWorks() {
  const { language } = useLanguage()
  const t = translations[language]
  const { ref, isVisible } = useAnimateOnScroll()

  const steps = [
    { title: t.step1Title, desc: t.step1Desc },
    { title: t.step2Title, desc: t.step2Desc },
    { title: t.step3Title, desc: t.step3Desc },
    { title: t.step4Title, desc: t.step4Desc },
  ]

  return (
    <section id="how" className="py-20 md:py-28" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {t.how}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            {t.howTitle}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            {t.howDesc}
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((s, i) => {
            const Icon = icons[i]
            return (
              <div
                key={i}
                className={`group relative p-8 rounded-2xl border border-border bg-card text-center hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1 ${
                  isVisible ? "animate-fade-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${(i + 1) * 100}ms` }}
              >
                <div className="absolute top-4 right-4 text-5xl font-bold text-muted/30 select-none">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mx-auto mb-6 w-14 h-14 flex items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-foreground">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
