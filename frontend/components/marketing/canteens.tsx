import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Clock } from "lucide-react"
import Link from "next/link"

const canteens = [
  {
    id: 1,
    name: "Main Canteen 2",
    location: "Main Building, 2nd Floor",
    hours: "10:00 - 16:00",
    image: "/modern-university-canteen-interior.jpg",
  },
  {
    id: 2,
    name: "Narxoz canteen",
    location: "Main Building, 3rd Floor",
    hours: "10:00 - 16:00",
    image: "/university-cafeteria-food-court.jpg",
  },
]

export function Canteens() {
  return (
    <section id="canteens" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Наши столовые</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Найдите ближайшую столовую</p>
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
                <Link href={`#menu`}>
                  <Button variant="outline" className="w-full bg-transparent">
                    Посмотреть меню
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
