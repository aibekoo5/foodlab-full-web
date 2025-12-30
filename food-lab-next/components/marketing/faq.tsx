"use client"

import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/i18n"

export function FAQ() {
  const { language } = useLanguage()
  const t = translations[language]

  const questions = [
    { q: t.faq1 || 'Қалдық кредит өтеді ме?', a: t.faq1a || 'Иә, кредиттер сақталады.' },
    { q: t.faq2 || 'Бір күнде неше рет қолдануға болады?', a: t.faq2a || 'Күнделікті бір рет.' },
    { q: t.faq3 || 'Қай асханаларда жарамды?', a: t.faq3a || 'Барлық серіктес асханаларда.' },
  ]

  return (
    <section id="faq" className="py-16 md:py-24 bg-muted/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">FAQ</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t.faqIntro || ''}</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {questions.map((qa, i) => (
            <div key={i} className="p-4 border rounded-lg bg-background">
              <div className="font-semibold">{qa.q}</div>
              <div className="text-sm text-muted-foreground mt-2">{qa.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
