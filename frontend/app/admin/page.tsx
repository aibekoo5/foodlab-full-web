import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Store, CreditCard, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"

const stats = [
  { label: "Всего подписчиков", value: "2,547", icon: Users, change: "+12.5%", positive: true },
  { label: "Активных столовых", value: "8", icon: Store, change: "+2", positive: true },
  { label: "Месячный доход", value: "4.2M ₸", icon: CreditCard, change: "+18.2%", positive: true },
  { label: "Ср. обедов/день", value: "847", icon: TrendingUp, change: "-3.1%", positive: false },
]

const recentActivity = [
  { id: 1, type: "subscription", user: "Алия К.", action: "Купила Pro Plan", time: "5 мин назад" },
  { id: 2, type: "order", user: "Даурен М.", action: "Заказ в Main Canteen 2", time: "12 мин назад" },
  { id: 3, type: "fraud", user: "Нурсултан А.", action: "Подозрение на мошенничество", time: "1 час назад" },
  { id: 4, type: "canteen", user: "Narxoz Canteen", action: "Обновлено меню", time: "2 часа назад" },
]

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <AdminSidebar />

      <div className="flex-1">
        <header className="bg-background border-b border-border p-4">
          <h1 className="text-xl font-bold">Дашборд</h1>
          <p className="text-sm text-muted-foreground">Обзор системы FoodLab</p>
        </header>

        <main className="p-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div
                      className={`flex items-center gap-1 text-sm ${stat.positive ? "text-green-600" : "text-red-600"}`}
                    >
                      {stat.positive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                      {stat.change}
                    </div>
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
                <CardTitle>Последняя активность</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className={`flex items-center justify-between p-4 rounded-lg ${
                        activity.type === "fraud" ? "bg-red-50" : "bg-muted/50"
                      }`}
                    >
                      <div>
                        <p className="font-medium">{activity.user}</p>
                        <p
                          className={`text-sm ${activity.type === "fraud" ? "text-red-600" : "text-muted-foreground"}`}
                        >
                          {activity.action}
                        </p>
                      </div>
                      <span className="text-sm text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Топ столовые</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Main Canteen 2", orders: 1247, revenue: "1.8M ₸" },
                    { name: "Narxoz Canteen", orders: 892, revenue: "1.2M ₸" },
                    { name: "Library Cafe", orders: 456, revenue: "680K ₸" },
                    { name: "Sport Complex", orders: 234, revenue: "340K ₸" },
                  ].map((canteen, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">{canteen.name}</p>
                        <p className="text-sm text-muted-foreground">{canteen.orders} заказов</p>
                      </div>
                      <span className="font-semibold text-primary">{canteen.revenue}</span>
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
