"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Clock } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/i18n"

// Серіктестер тізімі - 5 элемент
const partners = [
  {
    id: "partner-1",
    name: "Narxoz",
    logo: "/logos/narxoz.png",
  },
  {
    id: "partner-2",
    name: "Qaganat",
    logo: "/logos/qaganat.png",
  },
  {
    id: "partner-3",
    name: "Tagam",
    logo: "/logos/tagam.png",
  },
  {
    id: "partner-4",
    name: "Keremet food",
    logo: "/logos/keremet.jpg",
  },
  {
    id: "partner-5",
    name: "Meiman Group",
    logo: "/logos/meiman.jpg",
  }
]

export function PartnerDinings() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <section id="partners" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Заголовки по центру */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.partnersTitle || "Біздің серіктестер"}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.partnersSubtitle || "Ең үздік провайдерлермен ынтымақтастықта"}
          </p>
        </div>

        {/* Логотипы */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {partners.map((partner) => (
            <div 
              key={partner.id} 
              className="group relative flex flex-col items-center"
            >
              {/* Круглый логотип с ховер-анимацией */}
              <div 
                className="
                  w-24 h-24 rounded-full bg-white 
                  flex items-center justify-center 
                  shadow-md hover:shadow-xl 
                  transition-all duration-300 
                  group-hover:scale-110 group-hover:shadow-primary/20
                  overflow-hidden border border-gray-100
                  md:w-28 md:h-28
                "
              >
                {/* Вариант 1: Если логотип уже круглый или прозрачный фон */}
                <img
                  src={partner.logo || "/placeholder.svg"}
                  alt={`${partner.name} logo`}
                  className="
                    w-20 h-20 object-cover rounded-full
                    transition-all duration-300
                    group-hover:scale-105
                    md:w-24 md:h-24
                  "
                />
              </div>
              
              {/* Название партнера с анимацией */}
              <span 
                className="
                  mt-4 text-sm font-medium text-gray-700 
                  transition-all duration-300
                  group-hover:text-primary
                  group-hover:font-semibold
                  text-center
                "
              >
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}