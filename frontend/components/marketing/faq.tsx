"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/i18n"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function FAQ() {
  const { language } = useLanguage()
  const t = translations[language]
  const [ref, isVisible] = useScrollAnimation()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const questions = [
    { q: t.faq1, a: t.faq1a },
    { q: t.faq2, a: t.faq2a },
    { q: t.faq3, a: t.faq3a },
  ]

  return (
    <section id="faq" className="py-20 md:py-28">
      <div ref={ref} className="container mx-auto px-4 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            {t.faqIntro}
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {questions.map((qa, i) => (
            <div
              key={i}
              className={`rounded-2xl border border-border bg-background overflow-hidden transition-all duration-500 hover:border-primary/30 ${
                openIndex === i ? "shadow-lg shadow-primary/5 border-primary/20" : ""
              } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: isVisible ? `${i * 100}ms` : "0ms" }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-semibold text-foreground pr-4">{qa.q}</span>
                <ChevronDown
                  className={`h-5 w-5 text-primary shrink-0 transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  openIndex === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="px-6 pb-6 text-muted-foreground leading-relaxed">{qa.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
