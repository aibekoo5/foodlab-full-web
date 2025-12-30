"use client"

import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, MapPin, Clock, QrCode, Settings } from "lucide-react"

const canteens = [
  {
    id: 1,
    name: "Main Canteen 2",
    location: "Main Building, 2nd Floor",
    hours: "10:00 - 16:00",
    status: "active",
    todayOrders: 127,
    menuItems: 12,
  },
  {
    id: 2,
    name: "Narxoz Canteen",
    location: "Main Building, 3rd Floor",
    hours: "10:00 - 16:00",
    status: "active",
    todayOrders: 89,
    menuItems: 8,
  },
  {
    id: 3,
    name: "Library Cafe",
    location: "Library Building, 1st Floor",
    hours: "09:00 - 18:00",
    status: "inactive",
    todayOrders: 0,
    menuItems: 15,
  },
]

export default function AdminCanteensPage() {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <AdminSidebar />

      <div className="flex-1">
        <header className="bg-background border-b border-border p-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Столовые</h1>
            <p className="text-sm text-muted-foreground">Управление партнерами</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
            <Plus className="h-4 w-4" />
            Добавить столовую
          </Button>
        </header>

        <main className="p-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {canteens.map((canteen) => (
              <Card key={canteen.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{canteen.name}</CardTitle>
                    <Badge
                      className={
                        canteen.status === "active" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-700"
                      }
                    >
                      {canteen.status === "active" ? "Активна" : "Неактивна"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {canteen.location}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {canteen.hours}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <p className="text-2xl font-bold">{canteen.todayOrders}</p>
                      <p className="text-sm text-muted-foreground">заказов сегодня</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{canteen.menuItems}</p>
                      <p className="text-sm text-muted-foreground">блюд в меню</p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" size="sm" className="flex-1 gap-1 bg-transparent">
                      <QrCode className="h-4 w-4" />
                      QR код
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 gap-1 bg-transparent">
                      <Settings className="h-4 w-4" />
                      Настройки
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
