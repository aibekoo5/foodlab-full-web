"use client"

import { Button } from "@/components/ui/button"
import { Check, Sparkles } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/i18n"
import { formatNumber } from "@/lib/utils"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const plans = [
  {
    id: 1,
    name: "Basic",
    description: { ru: "Для индивидуального использования", kz: "Жеке пайдалануға тамаша" },
    price: 15999,
    meals: 15,
    features: [
      { ru: "Питание 3-4 раза в неделю", kz: "Аптасына 3-4 рет тамақтану" },
      { ru: "Сбалансированное меню", kz: "Теңгерімді мәзір" },
      { ru: "Завтрак + обед на выбор", kz: "Таңғы ас + түскі ас" },
      { ru: "Для студентов", kz: "Студенттерге тиімді" },
    ],
  },
  {
    id: 2,
    name: "Pro",
    description: { ru: "Для активных пользователей", kz: "Белсенді пайдаланушыларға" },
    price: 20000,
    meals: 20,
    popular: true,
    features: [
      { ru: "Частое питание", kz: "Жиі тамақтану" },
      { ru: "Калории рассчитаны", kz: "Калория есептелген" },
      { ru: "Быстрое приготовление", kz: "Жылдам дайындалу" },
      { ru: "Приоритетное обслуживание", kz: "Басым қызмет көрсету" },
    ],
  },
  {
    id: 3,
    name: "Enterprise",
    description: { ru: "Для ежедневного питания", kz: "Күнделікті тамақтануға" },
    price: 24999,
    meals: 25,
    features: [
      { ru: "Ежедневное питание", kz: "Күнделікті тамақтану" },
      { ru: "Большие порции + премиум", kz: "Үлкен порция + премиум" },
      { ru: "Для офиса и команд", kz: "Кеңсе мен команда үшін" },
      { ru: "VIP поддержка", kz: "VIP қолдау" },
    ],
  },
]

export function Pricing() {
  const { language } = useLanguage()
  const t = translations[language]
  const [ref, isVisible] = useScrollAnimation()

  return (
    <section id="packages" className="py-20 md:py-28 bg-secondary/50">
      <div ref={ref} className="container mx-auto px-4 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            {t.pricingTitle}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            {t.pricingSubtitle}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={plan.id}
              className={`group relative rounded-2xl bg-background border transition-all duration-500 hover:-translate-y-2 ${
                plan.popular
                  ? "border-primary shadow-xl shadow-primary/10 scale-[1.02]"
                  : "border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
              } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: isVisible ? `${i * 120}ms` : "0ms" }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg shadow-primary/25">
                    <Sparkles className="h-3.5 w-3.5" />
                    {language === "ru" ? "Популярный" : "Танымал"}
                  </span>
                </div>
              )}
              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-foreground mb-1">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description[language]}</p>
                </div>
                <div className="text-center mb-8">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-bold text-primary">{formatNumber(plan.price)}</span>
                    <span className="text-lg text-muted-foreground font-medium">&#x20B8;</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {plan.meals} {t.meals}
                  </p>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                      <div className="mt-0.5 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-muted-foreground">{feature[language]}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/coming-soon" target="_blank">
                  <Button
                    className={`w-full rounded-xl h-12 font-medium transition-all duration-300 ${
                      plan.popular
                        ? "bg-primary hover:bg-primary/90 text-primary-foreground hover:shadow-lg hover:shadow-primary/25"
                        : "bg-foreground/5 hover:bg-primary text-foreground hover:text-primary-foreground"
                    }`}
                  >
                    {t.choosePlanBtn}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
