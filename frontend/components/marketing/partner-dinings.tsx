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
    description: "Narxz University, Narxoz canteen"
  },
  {
    id: "partner-2",
    name: "Qaganat",
    logo: "/logos/fresh-bistro-logo.png",
    description: "Одна из крупнейших и самых популярных сетей общественного питания в Казахстане."
  },
  {
    id: "Tagam",
    name: "Burger Street",
    logo: "/logos/burger-street-logo.png",
    description: "Tagam. Вкусная кухня Tagam в цифрах 30 действующие точки."
  },
  {
    id: "partner-4",
    name: "Keremet foods",
    logo: "/logos/asian-wok-logo.png",
    description: "Кеңсеңізге дейін кешенді тамақтану"
  },
  {
    id: "partner-5",
    name: "Meiman Group",
    logo: "/logos/sweet-delight-logo.png",
    description: "Басқарушылық компаниясы"
  }
]

export function PartnerDinings() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <section id="partners" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.partnersTitle || "Our Partners"}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.partnersSubtitle || "Collaborating with the best culinary providers"}
          </p>
        </div>

        {/* Серіктестер тізімі - 2 қатар */}
        <div className="max-w-6xl mx-auto">
          {/* Бірінші қатар: 3 серіктес */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
            {partners.slice(0, 3).map((partner) => (
              <div 
                key={partner.id} 
                className="bg-white rounded-xl p-6 md:p-8 hover:shadow-lg transition-shadow duration-300 border"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <img
                      src={partner.logo || "/placeholder.svg"}
                      alt={`${partner.name} logo`}
                      className="w-16 h-16 md:w-20 md:h-20 object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg md:text-xl mb-2">{partner.name}</h3>
                    <p className="text-muted-foreground text-sm md:text-base">{partner.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Екінші қатар: 2 серіктес */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {partners.slice(3, 5).map((partner) => (
              <div 
                key={partner.id} 
                className="bg-white rounded-xl p-6 md:p-8 hover:shadow-lg transition-shadow duration-300 border"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <img
                      src={partner.logo || "/placeholder.svg"}
                      alt={`${partner.name} logo`}
                      className="w-16 h-16 md:w-20 md:h-20 object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg md:text-xl mb-2">{partner.name}</h3>
                    <p className="text-muted-foreground text-sm md:text-base">{partner.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}