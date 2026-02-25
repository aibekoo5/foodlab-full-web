"use client"

import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/i18n"
import { formatNumber } from "@/lib/utils"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"

const plans = [
  {
    id: 1,
    name: "Basic",
    description: { ru: "Идеально для начала", kz: "Бастау үшін тамаша" },
    price: 15999,
    meals: 15,
    features: [
      "features_basic_1",
      "features_basic_2",
      "features_basic_3",
      "features_basic_4",
    ],
  },
  {
    id: 2,
    name: "Pro",
    description: { ru: "Самый популярный", kz: "Ең танымал" },
    price: 20000,
    meals: 20,
    popular: true,
    features: [
      "features_pro_1",
      "features_pro_2",
      "features_pro_3",
      "features_pro_4",
    ],
  },
  {
    id: 3,
    name: "Premium",
    description: { ru: "Для ежедневного питания", kz: "Күнделікті тамақтану үшін" },
    price: 24999,
    meals: 25,
    features: [
      "features_premium_1",
      "features_premium_2",
      "features_premium_3",
      "features_premium_4",
    ],
  },
]

export function Pricing() {
  const { language } = useLanguage()
  const t = translations[language]
  const { ref, isVisible } = useAnimateOnScroll()

  return (
    <section id="packages" className="py-20 md:py-28" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {t.pricingTitle}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            {t.pricingSubtitle}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={plan.id}
              className={`group relative rounded-3xl border bg-card p-8 transition-all duration-500 hover:-translate-y-2 ${
                plan.popular
                  ? "border-primary shadow-xl shadow-primary/10 scale-[1.02]"
                  : "border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              } ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${(i + 1) * 150}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-medium px-4 py-1.5 rounded-full shadow-lg shadow-primary/25">
                    {language === "ru" ? "Популярный" : "Танымал"}
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-foreground mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description[language]}</p>
              </div>

              <div className="text-center mb-8">
                <span className="text-4xl font-bold text-foreground">
                  {formatNumber(plan.price)}
                </span>
                <span className="text-lg text-muted-foreground ml-1">&#8376;</span>
                <p className="text-sm text-muted-foreground mt-1">
                  {plan.meals} {t.meals}
                </p>
              </div>

              <ul className="space-y-3.5 mb-8">
                {plan.features.map((featureKey) => (
                  <li key={featureKey} className="flex items-start gap-3 text-sm">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-muted-foreground">
                      {t[featureKey as keyof typeof t]}
                    </span>
                  </li>
                ))}
              </ul>

              <Link href="#">
                <Button
                  className={`w-full rounded-full h-12 text-base font-medium transition-all ${
                    plan.popular
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25"
                      : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
                  }`}
                >
                  {t.choosePlanBtn}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
