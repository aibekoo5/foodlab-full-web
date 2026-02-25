"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/i18n"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import { ChevronDown } from "lucide-react"

export function FAQ() {
  const { language } = useLanguage()
  const t = translations[language]
  const { ref, isVisible } = useAnimateOnScroll()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const questions = [
    { q: t.faq1, a: t.faq1a },
    { q: t.faq2, a: t.faq2a },
    { q: t.faq3, a: t.faq3a },
  ]

  return (
    <section id="faq" className="py-20 md:py-28" ref={ref}>
      <div className="mx-auto max-w-3xl px-6">
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            {t.faqIntro}
          </h2>
        </div>

        <div className="space-y-4">
          {questions.map((qa, i) => (
            <div
              key={i}
              className={`rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:border-primary/30 ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${(i + 1) * 100}ms` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-semibold text-foreground pr-4">{qa.q}</span>
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? "max-h-40 pb-6" : "max-h-0"
                }`}
              >
                <p className="px-6 text-muted-foreground leading-relaxed">{qa.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
