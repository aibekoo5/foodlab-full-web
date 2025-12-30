import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface MealRecord {
  id: number
  date: string
  food: string
  drink: string
  canteen: string
}

interface MealHistoryProps {
  meals: MealRecord[]
}

export function MealHistory({ meals }: MealHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>История питания</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {meals.map((meal) => (
            <div key={meal.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div className="space-y-1">
                <p className="font-medium">{meal.food}</p>
                <p className="text-sm text-muted-foreground">{meal.drink}</p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {meal.canteen}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">{meal.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
