import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Calendar, Utensils } from "lucide-react"
import Link from "next/link"

interface SubscriptionCardProps {
  mealsLeft: number
  totalMeals: number
  expiryDate: string
  planName: string
}

export function SubscriptionCard({ mealsLeft, totalMeals, expiryDate, planName }: SubscriptionCardProps) {
  const progress = (mealsLeft / totalMeals) * 100

  return (
    <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Ваша подписка</span>
          <span className="text-sm font-normal bg-primary text-primary-foreground px-3 py-1 rounded-full">
            {planName}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Utensils className="h-5 w-5 text-primary" />
              <span className="font-medium">Осталось обедов</span>
            </div>
            <span className="text-2xl font-bold text-primary">
              {mealsLeft}/{totalMeals}
            </span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-5 w-5" />
          <span>Действует до: {expiryDate}</span>
        </div>

        <div className="flex gap-3">
          <Link href="/student/scan" className="flex-1">
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Использовать</Button>
          </Link>
          <Link href="#packages">
            <Button variant="outline">Продлить</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
