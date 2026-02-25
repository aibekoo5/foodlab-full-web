"use client"

import { UserPlus, CreditCard, UtensilsCrossed, PackageCheck } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/i18n"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function HowItWorks() {
  const { language } = useLanguage()
  const t = translations[language]
  const [ref, isVisible] = useScrollAnimation()

  const steps = [
    { icon: UserPlus, title: t.step1Title, desc: t.step1Desc, step: "01" },
    { icon: CreditCard, title: t.step2Title, desc: t.step2Desc, step: "02" },
    { icon: UtensilsCrossed, title: t.step3Title, desc: t.step3Desc, step: "03" },
    { icon: PackageCheck, title: t.step4Title, desc: t.step4Desc, step: "04" },
  ]

  return (
    <section id="how" className="py-20 md:py-28 bg-secondary/50">
      <div ref={ref} className="container mx-auto px-4 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            {t.how}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            {t.howDesc}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((s, i) => (
            <div
              key={i}
              className={`group relative p-8 rounded-2xl bg-background border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-2 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: isVisible ? `${i * 120}ms` : "0ms" }}
            >
              <div className="text-6xl font-bold text-primary/10 absolute top-4 right-6 group-hover:text-primary/20 transition-colors duration-300">
                {s.step}
              </div>
              <div className="relative">
                <div className="mb-6 w-14 h-14 flex items-center justify-center rounded-2xl bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <s.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-foreground">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
