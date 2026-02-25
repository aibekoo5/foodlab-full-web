"use client"

import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/i18n"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import { Star } from "lucide-react"

const reviews = [
  { id: 1, name: "Aida K.", uni: "Narxoz University", text: "reviewText1" as const, rating: 5 },
  { id: 2, name: "Bek M.", uni: "Narxoz University", text: "reviewText2" as const, rating: 5 },
  { id: 3, name: "Dana S.", uni: "Narxoz University", text: "reviewText3" as const, rating: 5 },
]

export function Testimonials() {
  const { language } = useLanguage()
  const t = translations[language]
  const { ref, isVisible } = useAnimateOnScroll()

  return (
    <section id="reviews" className="py-20 md:py-28 bg-accent/30" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {t.reviewsTitle}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            {t.reviewsSubtitle}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {reviews.map((r, i) => (
            <div
              key={r.id}
              className={`group p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1 ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${(i + 1) * 150}ms` }}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground leading-relaxed mb-6">
                {'"'}{t[r.text]}{'"'}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  {r.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-sm text-foreground">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.uni}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
