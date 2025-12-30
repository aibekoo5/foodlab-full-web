"use client"

import Image from 'next/image'
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/i18n"

const reviews = [
  { id: 1, name: 'Aida', uni: 'Narxoz', text: 'Тамақ өте дәмді және қолжетімді!' },
  { id: 2, name: 'Bek', uni: 'Narxoz', text: 'Уақыт үнемдейміз, кезісіз аламыз.' },
]

export function Testimonials() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <section id="reviews" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">{t.reviewsTitle || 'Пікірлер'}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t.reviewsSubtitle || ''}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {reviews.map((r) => (
            <div key={r.id} className="p-6 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">{r.name[0]}</div>
                <div>
                  <div className="font-semibold">{r.name}</div>
                  <div className="text-sm text-muted-foreground">{r.uni}</div>
                </div>
              </div>
              <p className="mt-4 text-sm">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
