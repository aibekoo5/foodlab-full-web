import { StudentHeader } from "@/components/student/student-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"

const mockHistory = [
  {
    id: 1,
    date: "07.12.2025",
    time: "12:30",
    food: "Манты",
    drink: "Green Start",
    canteen: "Main Canteen 2",
    status: "completed",
  },
  {
    id: 2,
    date: "06.12.2025",
    time: "13:15",
    food: "Плов",
    drink: "Tropical Boost",
    canteen: "Narxoz canteen",
    status: "completed",
  },
  {
    id: 3,
    date: "05.12.2025",
    time: "12:00",
    food: "Гречка с котлетой",
    drink: "Berry Mood",
    canteen: "Main Canteen 2",
    status: "completed",
  },
  {
    id: 4,
    date: "04.12.2025",
    time: "12:45",
    food: "Сосиски с картофелем",
    drink: "Green Start",
    canteen: "Main Canteen 2",
    status: "completed",
  },
  {
    id: 5,
    date: "03.12.2025",
    time: "13:30",
    food: "Манты",
    drink: "Berry Mood",
    canteen: "Narxoz canteen",
    status: "completed",
  },
]

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <StudentHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Calendar className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">История питания</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Все заказы</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockHistory.map((meal) => (
                <div
                  key={meal.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{meal.food}</p>
                      <span className="text-muted-foreground">+</span>
                      <p className="text-muted-foreground">{meal.drink}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {meal.canteen}
                      </Badge>
                      <Badge className="bg-green-100 text-green-700 text-xs">Завершен</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{meal.date}</p>
                    <p className="text-sm text-muted-foreground">{meal.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
