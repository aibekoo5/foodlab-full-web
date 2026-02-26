"use client"

import { ArrowRight, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/i18n"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function NewsBanner() {
  const { language } = useLanguage()
  const t = translations[language]
  const [ref, isVisible] = useScrollAnimation()

  return (
    <section className="py-10 md:py-14">
      <div ref={ref} className="container mx-auto px-4 lg:px-8">
        <div
          className={`relative rounded-3xl overflow-hidden transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f14] to-[#1a1625]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(148,115,255,0.15),transparent_60%)]" />

          <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-12 items-center p-8 md:p-12 lg:p-16">
            {/* Text content */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 text-primary text-xs font-semibold mb-6 uppercase tracking-wider">
                <Zap className="h-3.5 w-3.5" />
                {t.newsTag}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-[#ffffff] mb-3">
                {t.newsTitle}
              </h3>
              <p className="text-lg text-primary font-medium mb-4">
                {t.newsSubtitle}
              </p>
              <p className="text-[#ffffff]/70 leading-relaxed mb-8 max-w-lg">
                {t.newsDescription}
              </p>
              <a href="/coming-soon" target="_blank">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-8 h-12 font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 gap-2">
                  {t.newsLearnMore}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
            </div>

            {/* Image */}
            <div className="relative hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/20">
                <img
                  src="/images/postamat.png"
                  alt="FoodLab Astamat"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f14]/30 to-transparent" />
              </div>
              {/* Floating accent */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/15 rounded-full blur-xl" />
            </div>

            {/* Mobile image */}
            <div className="lg:hidden rounded-2xl overflow-hidden">
              <img
                src="/images/postamat.png"
                alt="FoodLab Astamat"
                className="w-full h-auto object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
