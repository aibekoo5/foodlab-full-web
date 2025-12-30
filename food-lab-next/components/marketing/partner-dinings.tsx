"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Clock } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/i18n"

const partnerDinings = [
  {
    id: "main-canteen-2",
    name: "Main Canteen 2",
    location: "Main Building, 2nd Floor",
    hours: "08:00 - 20:00",
    image: "/modern-university-canteen-interior-with-yellow-cha.jpg",
  },
  {
    id: "narxoz-canteen",
    name: "Narxoz canteen",
    location: "Main Building, 3rd Floor",
    hours: "08:00 - 20:00",
    image: "/university-cafeteria-food-court-with-red-accents.jpg",
  },
]

export function PartnerDinings() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <section id="canteens" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.partnerDiningsTitle}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t.partnerDiningsSubtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {partnerDinings.map((dining) => (
            <Card key={dining.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-[2/1] relative overflow-hidden">
                <img
                  src={dining.image || "/placeholder.svg"}
                  alt={dining.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-xl">{dining.name}</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{dining.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{dining.hours}</span>
                  </div>
                </div>
                <Link href={`/canteen/${dining.id}`}>
                  <Button variant="outline" className="w-full bg-transparent">
                    {t.viewCanteenMenu}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
