import { DiningSidebar } from "@/components/dining/dining-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Utensils, CreditCard, TrendingUp } from "lucide-react"

const stats = [
  { label: "Студентов сегодня", value: "127", icon: Users, change: "+12%" },
  { label: "Порций продано", value: "342", icon: Utensils, change: "+8%" },
  { label: "Кредитов использовано", value: "298", icon: CreditCard, change: "+15%" },
  { label: "Средний чек", value: "1,450₸", icon: TrendingUp, change: "+3%" },
]

export default function DiningStatsPage() {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <DiningSidebar />

      <div className="flex-1">
        <header className="bg-background border-b border-border p-4">
          <h1 className="text-xl font-bold">Статистика</h1>
          <p className="text-sm text-muted-foreground">Аналитика столовой</p>
        </header>

        <main className="p-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <stat.icon className="h-8 w-8 text-primary" />
                    <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                  </div>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Популярные блюда</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Манты", count: 89, percentage: 85 },
                    { name: "Плов", count: 76, percentage: 72 },
                    { name: "Гречка с котлетой", count: 54, percentage: 51 },
                    { name: "Сосиски", count: 43, percentage: 41 },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-sm text-muted-foreground">{item.count} порций</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${item.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Часы пик</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { time: "12:00 - 13:00", count: 89, percentage: 100 },
                    { time: "13:00 - 14:00", count: 76, percentage: 85 },
                    { time: "11:00 - 12:00", count: 45, percentage: 50 },
                    { time: "14:00 - 15:00", count: 32, percentage: 36 },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{item.time}</span>
                        <span className="text-sm text-muted-foreground">{item.count} заказов</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${item.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
