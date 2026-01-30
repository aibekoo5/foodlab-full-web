"use client"

import { StudentHeader } from "@/components/student/student-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { QrCode, Camera, Check } from "lucide-react"
import { useState } from "react"

const mockMenu = {
  canteen: "Main Canteen 2",
  foods: [
    { id: 1, name: "Манты", description: "5 шт в порции", image: "/manti-dumplings.jpg" },
    { id: 2, name: "Плов", description: "С мясом", image: "/plov-rice.jpg" },
    { id: 3, name: "Гречка", description: "С котлетой", image: "/buckwheat.jpg" },
  ],
  drinks: [
    { id: 1, name: "Tropical Boost", image: "/placeholder.svg?height=80&width=80" },
    { id: 2, name: "Green Start", image: "/placeholder.svg?height=80&width=80" },
    { id: 3, name: "Berry Mood", image: "/placeholder.svg?height=80&width=80" },
  ],
}

export default function ScanPage() {
  const [scanned, setScanned] = useState(false)
  const [selectedFood, setSelectedFood] = useState<number | null>(null)
  const [selectedDrink, setSelectedDrink] = useState<number | null>(null)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const handleScan = () => {
    setScanned(true)
  }

  const handleOrder = () => {
    if (selectedFood && selectedDrink) {
      setOrderPlaced(true)
    }
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-muted/30">
        <StudentHeader />
        <main className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="p-12">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Заказ оформлен!</h2>
              <p className="text-muted-foreground mb-6">Ваш заказ отправлен в столовую. Пожалуйста, подождите.</p>
              <Badge className="bg-primary text-primary-foreground">1 кредит использован</Badge>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  if (!scanned) {
    return (
      <div className="min-h-screen bg-muted/30">
        <StudentHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Сканировать QR код</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="aspect-square bg-muted rounded-xl flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <QrCode className="h-24 w-24 text-muted-foreground mx-auto" />
                    <p className="text-muted-foreground">Наведите камеру на QR код столовой</p>
                  </div>
                </div>
                <Button
                  onClick={handleScan}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                >
                  <Camera className="h-4 w-4" />
                  Открыть камеру
                </Button>
                <p className="text-xs text-center text-muted-foreground">QR код находится на столах в столовой</p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <StudentHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center">
            <Badge className="bg-primary/10 text-primary mb-2">{mockMenu.canteen}</Badge>
            <h1 className="text-2xl font-bold">Выберите обед</h1>
            <p className="text-muted-foreground">1 блюдо + 1 напиток</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Основное блюдо</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {mockMenu.foods.map((food) => (
                  <button
                    key={food.id}
                    onClick={() => setSelectedFood(food.id)}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                      selectedFood === food.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    }`}
                  >
                    <img
                      src={food.image || "/placeholder.svg"}
                      alt={food.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{food.name}</p>
                      <p className="text-sm text-muted-foreground">{food.description}</p>
                    </div>
                    {selectedFood === food.id && <Check className="h-5 w-5 text-primary" />}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Напиток</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                {mockMenu.drinks.map((drink) => (
                  <button
                    key={drink.id}
                    onClick={() => setSelectedDrink(drink.id)}
                    className={`p-4 rounded-xl border-2 transition-all text-center ${
                      selectedDrink === drink.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <img
                      src={drink.image || "/placeholder.svg"}
                      alt={drink.name}
                      className="w-16 h-16 rounded-lg object-cover mx-auto mb-2"
                    />
                    <p className="text-sm font-medium">{drink.name}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={handleOrder}
            disabled={!selectedFood || !selectedDrink}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-lg"
          >
            Оплатить подпиской (1 кредит)
          </Button>
        </div>
      </main>
    </div>
  )
}
