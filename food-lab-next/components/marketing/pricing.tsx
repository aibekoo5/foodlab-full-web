"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/i18n"
import { formatNumber } from "@/lib/utils"

const plans = [
  {
    id: 1,
    name: "Basic Plan",
    description: { ru: "Идеально для индивидуального использования", kz: "Жеке пайдалануға тамаша" },
    price: 15999,
    meals: 15,
    features: ["max_orders_per_day: 10", "priority_support: false", "advanced_analytics: false"],
  },
  {
    id: 2,
    name: "Pro Plan",
    description: { ru: "Для активных пользователей", kz: "Белсенді пайдаланушылар үшін" },
    price: 20000,
    meals: 20,
    popular: true,
    features: ["max_orders_per_day: 50", "priority_support: true", "advanced_analytics: true"],
  },
  {
    id: 3,
    name: "Enterprise Plan",
    description: { ru: "Для крупных организаций", kz: "Ірі ұйымдар үшін" },
    price: 24999,
    meals: 25,
    features: [
      "max_orders_per_day: 1000",
      "priority_support: true",
      "advanced_analytics: true",
      "custom_integrations: true",
    ],
  },
]

export function Pricing() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <section id="packages" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.pricingTitle}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t.pricingSubtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card key={plan.id} className={`relative ${plan.popular ? "border-primary shadow-lg" : ""}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full">
                    {language === "ru" ? "Популярный" : "Танымал"}
                  </span>
                </div>
              )}
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{plan.description[language]}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <span className="text-4xl font-bold text-primary">{formatNumber(plan.price)}₸</span>
                  <p className="text-sm text-muted-foreground">
                    {plan.meals} {t.meals}
                  </p>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/student">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    {t.choosePlanBtn}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
