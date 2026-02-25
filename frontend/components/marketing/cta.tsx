"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/i18n"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"

export function CTA() {
  const { language } = useLanguage()
  const t = translations[language]
  const { ref, isVisible } = useAnimateOnScroll()

  return (
    <section className="py-20 md:py-28" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`relative overflow-hidden rounded-3xl bg-primary p-12 md:p-20 text-center ${
            isVisible ? "animate-scale-in" : "opacity-0"
          }`}
        >
          {/* Background decoration */}
          <div className="absolute inset-0 -z-0">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-foreground/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 text-balance">
              {t.ctaTitle}
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
              {t.ctaSubtitle}
            </p>
            <Link href="https://docs.google.com/forms/d/e/1FAIpQLScMKp91i6JogNAzSl7Za7QH9igVreq4kfooKIi9vw4yzn2LBg/viewform">
              <Button
                size="lg"
                className="bg-card text-foreground hover:bg-card/90 rounded-full px-10 h-13 text-base font-medium gap-2 shadow-2xl transition-all hover:-translate-y-0.5"
              >
                {t.startNow}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
