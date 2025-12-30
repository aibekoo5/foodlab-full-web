"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/i18n"

export function CTA() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="rounded-3xl bg-gradient-to-r from-primary to-primary/80 p-8 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 text-balance">{t.ctaTitle}</h2>
          <p className="text-primary-foreground/90 max-w-2xl mx-auto mb-8">{t.ctaSubtitle}</p>
          <Link href="/student">
            <Button size="lg" variant="secondary" className="gap-2 bg-white text-foreground hover:bg-white/90">
              {t.startNow}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
