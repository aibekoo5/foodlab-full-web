"use client"

import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/i18n"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"
import { Newspaper, ArrowRight, Sparkles, TrendingUp } from "lucide-react"

const newsItems = [
  {
    titleKey: "news1Title" as const,
    descKey: "news1Desc" as const,
    icon: Sparkles,
    tag: "new" as const,
  },
  {
    titleKey: "news2Title" as const,
    descKey: "news2Desc" as const,
    icon: TrendingUp,
    tag: "update" as const,
  },
  {
    titleKey: "news3Title" as const,
    descKey: "news3Desc" as const,
    icon: Newspaper,
    tag: "soon" as const,
  },
]

export function NewsBanner() {
  const { language } = useLanguage()
  const t = translations[language]
  const { ref, isVisible } = useAnimateOnScroll()

  return (
    <section id="news" className="py-20 md:py-28 bg-accent/30" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {t.news}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            {t.newsTitle}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            {t.newsSubtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {newsItems.map((item, i) => {
            const Icon = item.icon
            return (
              <div
                key={item.titleKey}
                className={`group relative rounded-2xl bg-card border border-border p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1 ${
                  isVisible ? "animate-fade-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${(i + 1) * 150}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.tag === "new" ? "bg-primary/10 text-primary" :
                        item.tag === "update" ? "bg-accent text-accent-foreground" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {t[`tag_${item.tag}` as keyof typeof t]}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors">
                      {t[item.titleKey]}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t[item.descKey]}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  {t.readMore}
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
