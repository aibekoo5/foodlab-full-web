"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/i18n"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function CTA() {
  const { language } = useLanguage()
  const t = translations[language]
  const [ref, isVisible] = useScrollAnimation()

  return (
    <section className="py-20 md:py-28">
      <div ref={ref} className="container mx-auto px-4 lg:px-8">
        <div
          className={`relative rounded-3xl overflow-hidden transition-all duration-700 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-[#9473ff]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1),transparent_50%)]" />

          <div className="relative px-8 py-16 md:px-16 md:py-24 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#ffffff] mb-6 text-balance max-w-3xl mx-auto">
              {t.ctaTitle}
            </h2>
            <p className="text-[#ffffff]/80 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
              {t.ctaSubtitle}
            </p>
            <Link href="https://docs.google.com/forms/d/e/1FAIpQLScMKp91i6JogNAzSl7Za7QH9igVreq4kfooKIi9vw4yzn2LBg/viewform" target="_blank">
              <Button
                size="lg"
                className="bg-[#ffffff] text-[#9473ff] hover:bg-[#ffffff]/90 gap-2 rounded-xl px-10 h-14 text-base font-semibold transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
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
