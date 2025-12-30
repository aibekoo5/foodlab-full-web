import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatNumber } from "@/lib/utils"

const menuItems = [
  {
    id: 1,
    name: "Манты",
    description: "1 порцияға 5 манты кіреді",
    price: 1200,
    canteen: "Main Canteen 2",
    category: "food",
    image: "/manti-dumplings-steamed.jpg",
  },
  {
    id: 2,
    name: "Тамақ 2",
    description: "Плов с мясом",
    price: 1400,
    canteen: "Main Canteen 2",
    category: "food",
    image: "/plov-rice-meat-dish.jpg",
  },
  {
    id: 3,
    name: "Тамақ 3",
    description: "Гречка с котлетой",
    price: 1400,
    canteen: "Main Canteen 2",
    category: "food",
    image: "/buckwheat-with-cutlet.jpg",
  },
  {
    id: 4,
    name: "Тамақ 4",
    description: "Сосиски с картофелем",
    price: 1400,
    canteen: "Main Canteen 2",
    category: "food",
    image: "/sausages-with-fries.jpg",
  },
]

export function DailyMenu() {
  return (
    <section id="menu" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Меню дня</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Свежие, питательные блюда, приготовленные сегодня</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-[4/3] relative overflow-hidden">
                <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <Badge variant="outline" className="text-xs shrink-0">
                    {item.category}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                <p className="text-sm text-primary">{item.canteen}</p>
                <p className="text-xl font-bold text-primary">{formatNumber(item.price)}₸</p>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Заказать в постамат
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
