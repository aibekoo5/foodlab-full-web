"use client"

import { Star, Quote } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/i18n"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const reviews = {
  kz: [
    { id: 1, name: "Аида", uni: "Нархоз Университеті", text: "Идея өте керемет, маған қатты ұнады. Іске қосылғанда міндетті түрде қолданамын!", avatar: "А" },
    { id: 2, name: "Бекдаулет", uni: "Нархоз Университеті", text: "Бізге дәл осы қажет еді. Қолдаймын, бұның үлкен болашағы бар!", avatar: "Б" },
    { id: 3, name: "Диана", uni: "Нархоз Университеті", text: "Студенттерге арналған тамаша идея! Күнделікті уақыт пен ақшаны үнемдейді.", avatar: "Д" },
  ],
  ru: [
    { id: 1, name: "Аида", uni: "Университет Нархоз", text: "Идея отличная, мне очень нравится. Обязательно буду пользоваться, когда запустят!", avatar: "А" },
    { id: 2, name: "Бекдаулет", uni: "Университет Нархоз", text: "Это именно то, что нам нужно. Поддерживаю, у этого большое будущее!", avatar: "Б" },
    { id: 3, name: "Диана", uni: "Университет Нархоз", text: "Потрясающая идея для студентов! Экономит время и деньги каждый день.", avatar: "Д" },
  ]
}

export function Testimonials() {
  const { language } = useLanguage()
  const t = translations[language]
  const [ref, isVisible] = useScrollAnimation()
  
  // Get reviews based on current language
  const currentReviews = reviews[language as keyof typeof reviews]

  return (
    <section id="reviews" className="py-20 md:py-28">
      <div ref={ref} className="container mx-auto px-4 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            {t.reviewsTitle}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            {t.reviewsSubtitle}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {currentReviews.map((r, i) => (
            <div
              key={r.id}
              className={`group relative p-8 rounded-2xl bg-background border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-2 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: isVisible ? `${i * 120}ms` : "0ms" }}
            >
              <Quote className="h-8 w-8 text-primary/20 mb-4 group-hover:text-primary/40 transition-colors duration-300" />
              <p className="text-foreground/80 mb-6 leading-relaxed">{r.text}</p>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  {r.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.uni}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}