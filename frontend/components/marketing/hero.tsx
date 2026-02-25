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
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Subtle background shapes */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {t.heroBadge}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-balance">
              {t.heroTitle}
              <span className="text-primary block mt-2">{t.heroTitle2}</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              {t.heroSubtitle}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="#packages">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 rounded-full px-8 h-12 text-base shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
                >
                  {t.choosePlan}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#how">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 h-12 text-base border-border hover:bg-accent transition-all hover:-translate-y-0.5"
                >
                  {t.viewMenu}
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-8 pt-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">{t.studentsCount}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">{t.saveTime}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">{t.qualityGuarantee}</span>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-up delay-200">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/10">
              <img
                src="/images/hero-food-plALpgKa.jpg"
                alt={t.heroImageAlt}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent" />
            </div>
            {/* Floating stats card */}
            <div className="absolute -bottom-4 -left-4 bg-card rounded-2xl p-4 shadow-xl border border-border animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">1M+</div>
                  <div className="text-xs text-muted-foreground">{t.studentsCount}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
