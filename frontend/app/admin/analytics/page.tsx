import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatNumber } from "@/lib/utils"

export default function AdminAnalyticsPage() {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <AdminSidebar />

      <div className="flex-1">
        <header className="bg-background border-b border-border p-4">
          <h1 className="text-xl font-bold">Аналитика</h1>
          <p className="text-sm text-muted-foreground">Общая статистика системы</p>
        </header>

        <main className="p-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-1">Месячный доход</p>
                <p className="text-3xl font-bold">4.2M ₸</p>
                <p className="text-sm text-green-600">+18.2% vs прошлый месяц</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-1">Подписчики</p>
                <p className="text-3xl font-bold">2,547</p>
                <p className="text-sm text-green-600">+124 новых</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-1">DAU</p>
                <p className="text-3xl font-bold">847</p>
                <p className="text-sm text-muted-foreground">активных в день</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-1">Ср. обедов/пользователь</p>
                <p className="text-3xl font-bold">2.3</p>
                <p className="text-sm text-muted-foreground">в неделю</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Подписки по планам</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Basic Plan", count: 456, percentage: 30, color: "bg-blue-500" },
                    { name: "Pro Plan", count: 892, percentage: 55, color: "bg-primary" },
                    { name: "Enterprise Plan", count: 234, percentage: 15, color: "bg-amber-500" },
                  ].map((plan, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{plan.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {plan.count} ({plan.percentage}%)
                        </span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div className={`h-full ${plan.color} rounded-full`} style={{ width: `${plan.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Заказы по столовым</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Main Canteen 2", orders: 12470, percentage: 45 },
                    { name: "Narxoz Canteen", orders: 8920, percentage: 32 },
                    { name: "Library Cafe", orders: 4560, percentage: 16 },
                    { name: "Sport Complex", orders: 1940, percentage: 7 },
                  ].map((canteen, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{canteen.name}</span>
                        <span className="text-sm text-muted-foreground">{formatNumber(canteen.orders)} заказов</span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${canteen.percentage}%` }} />
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
