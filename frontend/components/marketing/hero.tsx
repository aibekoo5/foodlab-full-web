"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Clock, Shield } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/i18n"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function Hero() {
  const { language } = useLanguage()
  const t = translations[language]
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 })

  const stats = [
    { icon: Users, label: t.studentsCount },
    { icon: Clock, label: t.saveTime },
    { icon: Shield, label: t.qualityGuarantee },
  ]

  return (
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28 lg:pt-40 lg:pb-32">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

      <div ref={ref} className="container mx-auto px-4 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div
            className={`space-y-8 text-center lg:text-left transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {t.heroTag}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight text-balance">
              <span className="text-foreground">{t.heroTitle}</span>
              <br />
              <span className="text-primary">{t.heroTitle2}</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed">
              {t.heroSubtitle}
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link href="#packages">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 rounded-xl px-8 h-13 text-base font-medium transition-all duration-300 hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5"
                >
                  {t.choosePlan}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#how">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-xl px-8 h-13 text-base font-medium border-border hover:bg-secondary transition-all duration-300 hover:-translate-y-0.5"
                >
                  {t.viewMenu}
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-6 lg:gap-8 pt-4 justify-center lg:justify-start">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 text-sm text-muted-foreground"
                  style={{ transitionDelay: `${(i + 1) * 150}ms` }}
                >
                  <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary/10">
                    <stat.icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`relative transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative">
              {/* Decorative border */}
              <div className="absolute -inset-4 bg-primary/10 rounded-[2rem] rotate-2" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/10">
                <img
                  src="/images/hero-food-plALpgKa.jpg"
                  alt="Healthy meal boxes"
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-background rounded-2xl shadow-xl p-4 border border-border hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">30+</p>
                    <p className="text-xs text-muted-foreground">min saved daily</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
