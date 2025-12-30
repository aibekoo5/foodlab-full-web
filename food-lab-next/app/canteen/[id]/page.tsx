"use client"

import { useParams } from "next/navigation"
import { Header } from "@/components/marketing/header"
import { Footer } from "@/components/marketing/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/i18n"
import { formatNumber } from "@/lib/utils"

const canteensData: Record<
  string,
  {
    name: string
    location: string
    hours: string
    image: string
  }
> = {
  "main-canteen-2": {
    name: "Main Canteen 2",
    location: "Main Building, 2nd Floor",
    hours: "08:00 - 20:00",
    image: "/modern-university-canteen-interior-with-yellow-cha.jpg",
  },
  "narxoz-canteen": {
    name: "Narxoz canteen",
    location: "Main Building, 3rd Floor",
    hours: "08:00 - 20:00",
    image: "/university-cafeteria-food-court-with-red-accents.jpg",
  },
}

const menuItems = [
  {
    id: 1,
    name: { ru: "Манты", kz: "Мәнті" },
    description: { ru: "1 порцияға 5 манты кіреді", kz: "1 порцияға 5 мәнті кіреді" },
    price: 1200,
    category: "food",
    image: "/manti-dumplings-steamed-traditional.jpg",
  },
  {
    id: 2,
    name: { ru: "Тамақ 2", kz: "Тамақ 2" },
    description: { ru: "Плов с мясом", kz: "Еті бар палау" },
    price: 1400,
    category: "food",
    image: "/plov-rice-meat-dish-traditional.jpg",
  },
  {
    id: 3,
    name: { ru: "Тамақ 3", kz: "Тамақ 3" },
    description: { ru: "Гречка с котлетой", kz: "Котлетті гречка" },
    price: 1400,
    category: "food",
    image: "/buckwheat-with-cutlet-and-vegetables.jpg",
  },
  {
    id: 4,
    name: { ru: "Тамақ 4", kz: "Тамақ 4" },
    description: { ru: "Сосиски с картофелем", kz: "Картопты сосиска" },
    price: 1400,
    category: "food",
    image: "/sausages-with-french-fries.jpg",
  },
  {
    id: 5,
    name: { ru: "Салат Цезарь", kz: "Цезарь салаты" },
    description: { ru: "Свежий салат с курицей", kz: "Тауықты жаңа салат" },
    price: 1100,
    category: "food",
    image: "/caesar-salad-with-chicken.png",
  },
  {
    id: 6,
    name: { ru: "Борщ", kz: "Борщ" },
    description: { ru: "Традиционный борщ со сметаной", kz: "Қаймақты дәстүрлі борщ" },
    price: 900,
    category: "food",
    image: "/borscht-soup-traditional.jpg",
  },
]

export default function CanteenPage() {
  const params = useParams()
  const canteenId = params.id as string
  const canteen = canteensData[canteenId]
  const { language } = useLanguage()
  const t = translations[language]

  if (!canteen) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Столовая не найдена</p>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Canteen Hero Image */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-lg mb-8">
              <img
                src={canteen.image || "/placeholder.svg"}
                alt={canteen.name}
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>

            {/* Canteen Info */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{canteen.name}</h1>
              <div className="flex items-center justify-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>{canteen.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>
                    {t.workingHours}: {canteen.hours}
                  </span>
                </div>
              </div>
            </div>

            {/* Menu Section */}
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">{t.menuTitle}</h2>
              <p className="text-muted-foreground">{t.menuSubtitle}</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-[3/2] relative overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name[language]}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-lg">{item.name[language]}</h3>
                      <Badge variant="outline" className="text-xs shrink-0">
                        {item.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description[language]}</p>
                    <p className="text-xl font-bold text-primary">{formatNumber(item.price)}₸</p>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      {t.orderToPostamat}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
