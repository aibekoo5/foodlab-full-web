"use client"

import { GraduationCap, BookOpen, Briefcase } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/i18n"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function TargetAudience() {
  const { language } = useLanguage()
  const t = translations[language]
  const [ref, isVisible] = useScrollAnimation()

  const audiences = [
    {
      icon: GraduationCap,
      title: t.targetStudentTitle,
      description: t.targetStudentDesc,
      image: "/images/student.jpg",
    },
    {
      icon: BookOpen,
      title: t.targetPupilTitle,
      description: t.targetPupilDesc,
      image: "/images/pupil.jpg",
    },
    {
      icon: Briefcase,
      title: t.targetOfficeTitle,
      description: t.targetOfficeDesc,
      image: "/images/office-worker.jpg",
    },
  ]

  return (
    <section className="py-20 md:py-28">
      <div ref={ref} className="container mx-auto px-4 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            {t.targetTitle}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            {t.targetSubtitle}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {audiences.map((item, i) => (
            <div
              key={i}
              className={`group relative rounded-2xl overflow-hidden bg-background border border-border hover:border-primary/30 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-primary/10 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: isVisible ? `${i * 150}ms` : "0ms" }}
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f14]/60 via-transparent to-transparent" />
                {/* Icon badge */}
                <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-[#ffffff]/90 backdrop-blur-sm flex items-center justify-center shadow-lg transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
                  <item.icon className="h-6 w-6 text-primary group-hover:text-[#ffffff] transition-colors duration-300" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 lg:p-8">
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
