"use client"

import { CheckCircle } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/i18n"

export function HowItWorks() {
  const { language } = useLanguage()
  const t = translations[language]

  const steps = [
    { title: t.step1Title || 'Тіркел', desc: t.step1Desc || 'Создайте аккаунт' },
    { title: t.step2Title || 'Абонемент таңдау', desc: t.step2Desc || 'Выберите пакет' },
    { title: t.step3Title || 'QR сканер', desc: t.step3Desc || 'Сканируйте QR и заказывайте' },
    { title: t.step4Title || 'Алу', desc: t.step4Desc || 'Получите еду без очереди' },
  ]

  return (
    <section id="how" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">{t.how}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t.howDesc || ''}</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={i} className="p-6 rounded-2xl border border-border text-center">
              <div className="mx-auto mb-4 w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
