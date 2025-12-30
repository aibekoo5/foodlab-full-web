"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/i18n"

export function Postamat() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-muted/50 to-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <img src="/images/postamat.png" alt="Постамат FoodLab" className="w-full h-auto" />
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">{t.postamatTitle}</h2>
            <p className="text-lg text-muted-foreground">{t.postamatDescription}</p>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">{t.learnMore}</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
