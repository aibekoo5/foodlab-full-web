"use client"

import { StudentHeader } from "@/components/student/student-header"
import { SubscriptionCard } from "@/components/student/subscription-card"
import { MealHistory } from "@/components/student/meal-history"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { QrCode, CreditCard, Bell, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/i18n"
import { formatNumber } from "@/lib/utils"

const mockMeals = [
  { id: 1, date: "07.12.2025", food: "Манты", drink: "Green Start", canteen: "Main Canteen 2" },
  { id: 2, date: "06.12.2025", food: "Плов", drink: "Tropical Boost", canteen: "Narxoz canteen" },
  { id: 3, date: "05.12.2025", food: "Гречка с котлетой", drink: "Berry Mood", canteen: "Main Canteen 2" },
]

const menuItems = [
  {
    id: 1,
    name: { ru: "Манты", kz: "Мәнті" },
    description: { ru: "1 порцияға 5 манты кіреді", kz: "1 порцияға 5 мәнті кіреді" },
    price: 1200,
    canteen: "Main Canteen 2",
    category: "food",
    image: "/manti-dumplings-steamed.jpg",
  },
  {
    id: 2,
    name: { ru: "Тамақ 2", kz: "Тамақ 2" },
    description: { ru: "Плов с мясом", kz: "Еті бар палау" },
    price: 1400,
    canteen: "Main Canteen 2",
    category: "food",
    image: "/plov-rice-meat-dish.jpg",
  },
  {
    id: 3,
    name: { ru: "Тамақ 3", kz: "Тамақ 3" },
    description: { ru: "Гречка с котлетой", kz: "Котлетті гречка" },
    price: 1400,
    canteen: "Main Canteen 2",
    category: "food",
    image: "/buckwheat-cutlet-vegetables.jpg",
  },
  {
    id: 4,
    name: { ru: "Тамақ 4", kz: "Тамақ 4" },
    description: { ru: "Сосиски с картофелем", kz: "Картопты сосиска" },
    price: 1400,
    canteen: "Main Canteen 2",
    category: "food",
    image: "/sausages-fries-plate.jpg",
  },
]

const canteens = [
  {
    id: "main-canteen-2",
    name: "Main Canteen 2",
    location: "Main Building, 2nd Floor",
    hours: "10:00 - 16:00",
    image: "/modern-university-canteen-interior-with-yellow-cha.jpg",
  },
  {
    id: "narxoz-canteen",
    name: "Narxoz canteen",
    location: "Main Building, 3rd Floor",
    hours: "10:00 - 16:00",
    image: "/university-cafeteria-food-court-with-red-accents.jpg",
  },
]

export default function StudentDashboard() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div className="min-h-screen bg-muted/30">
      <StudentHeader />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">
          {t.welcome}, {language === "ru" ? "Студент" : "Студент"}!
        </h1>

        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          <div className="lg:col-span-2 space-y-6">
            <SubscriptionCard mealsLeft={15} totalMeals={20} expiryDate="31.01.2026" planName="Pro Plan" />

            <div className="grid sm:grid-cols-3 gap-4">
              <Link href="/student/scan">
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <QrCode className="h-10 w-10 text-primary mb-3" />
                    <p className="font-medium">{t.scanQR}</p>
                    <p className="text-sm text-muted-foreground">{t.orderFood}</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/student/settings">
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <CreditCard className="h-10 w-10 text-primary mb-3" />
                    <p className="font-medium">{t.payment}</p>
                    <p className="text-sm text-muted-foreground">{t.manageCards}</p>
                  </CardContent>
                </Card>
              </Link>
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <Bell className="h-10 w-10 text-primary mb-3" />
                  <p className="font-medium">{t.notifications}</p>
                  <p className="text-sm text-muted-foreground">3 {t.newNotifications}</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <MealHistory meals={mockMeals} />
          </div>
        </div>

        {/* Daily Menu Section */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{t.dailyMenuTitle}</h2>
            <p className="text-muted-foreground">{t.dailyMenuSubtitle}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {menuItems.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-[4/3] relative overflow-hidden">
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
                  <p className="text-sm text-primary">{item.canteen}</p>
                  <p className="text-xl font-bold text-primary">{formatNumber(item.price)}₸</p>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    {t.orderToPostamat}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Canteens Section */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{t.canteensTitle}</h2>
            <p className="text-muted-foreground">{t.canteensSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {canteens.map((canteen) => (
              <Card key={canteen.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-[2/1] relative overflow-hidden">
                  <img
                    src={canteen.image || "/placeholder.svg"}
                    alt={canteen.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold text-xl">{canteen.name}</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{canteen.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{canteen.hours}</span>
                    </div>
                  </div>
                  <Link href={`/canteen/${canteen.id}`}>
                    <Button variant="outline" className="w-full bg-transparent">
                      {t.viewCanteenMenu}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
