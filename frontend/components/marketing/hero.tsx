"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Clock, Shield } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/i18n"

export function Hero() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
              {t.heroTitle}
              <span className="text-primary block text-5xl">{t.heroTitle2}</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">{t.heroSubtitle}</p>
            <div className="flex flex-wrap gap-4">
              <Link href="#packages">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                  {t.choosePlan}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#menu">
                <Button size="lg" variant="outline">
                  {t.viewMenu}
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-8 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-5 w-5 text-primary" />
                <span>{t.studentsCount}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-5 w-5 text-primary" />
                <span>{t.saveTime}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-5 w-5 text-primary" />
                <span>{t.qualityGuarantee}</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img src="/images/hero-food-plALpgKa.jpg" alt="Здоровые обеды в контейнерах" className="w-full h-auto object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
