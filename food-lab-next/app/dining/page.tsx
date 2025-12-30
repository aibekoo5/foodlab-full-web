"use client"

import { DiningSidebar } from "@/components/dining/dining-sidebar"
import { OrderCard } from "@/components/dining/order-card"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"

type OrderStatus = "preparing" | "ready" | "completed"

interface Order {
  id: number
  studentName: string
  food: string
  drink: string
  time: string
  status: OrderStatus
}

const initialOrders: Order[] = [
  { id: 1001, studentName: "Алия К.", food: "Манты", drink: "Green Start", time: "12:30", status: "preparing" },
  { id: 1002, studentName: "Даурен М.", food: "Плов", drink: "Tropical Boost", time: "12:35", status: "preparing" },
  {
    id: 1003,
    studentName: "Айгерим Т.",
    food: "Гречка с котлетой",
    drink: "Berry Mood",
    time: "12:28",
    status: "ready",
  },
  { id: 1004, studentName: "Нурсултан А.", food: "Сосиски", drink: "Green Start", time: "12:20", status: "completed" },
]

export default function DiningDashboard() {
  const [orders, setOrders] = useState<Order[]>(initialOrders)

  const handleStatusChange = (id: number, newStatus: OrderStatus) => {
    setOrders(orders.map((order) => (order.id === id ? { ...order, status: newStatus } : order)))
  }

  const preparingOrders = orders.filter((o) => o.status === "preparing")
  const readyOrders = orders.filter((o) => o.status === "ready")
  const completedOrders = orders.filter((o) => o.status === "completed")

  return (
    <div className="flex min-h-screen bg-muted/30">
      <DiningSidebar />

      <div className="flex-1">
        <header className="bg-background border-b border-border p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="bg-foreground text-background min-h-full p-6">
                  <Link href="/dining" className="text-2xl font-bold text-primary mb-8 block">
                    FoodLab
                  </Link>
                  <nav className="space-y-2">
                    <Link
                      href="/dining"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary text-primary-foreground"
                    >
                      Заказы
                    </Link>
                    <Link
                      href="/dining/menu"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-background/70"
                    >
                      Меню дня
                    </Link>
                    <Link
                      href="/dining/stats"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-background/70"
                    >
                      Статистика
                    </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
            <div>
              <h1 className="text-xl font-bold">Заказы</h1>
              <p className="text-sm text-muted-foreground">Main Canteen 2</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                {preparingOrders.length}
              </span>
            </Button>
          </div>
        </header>

        <main className="p-6">
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Готовятся</p>
                <p className="text-3xl font-bold text-amber-600">{preparingOrders.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Готовы</p>
                <p className="text-3xl font-bold text-green-600">{readyOrders.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Завершены сегодня</p>
                <p className="text-3xl font-bold">{completedOrders.length}</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <h2 className="font-semibold">Готовятся</h2>
                <Badge className="bg-amber-100 text-amber-700">{preparingOrders.length}</Badge>
              </div>
              <div className="space-y-4">
                {preparingOrders.map((order) => (
                  <OrderCard key={order.id} order={order} onStatusChange={handleStatusChange} />
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <h2 className="font-semibold">Готовы к выдаче</h2>
                <Badge className="bg-green-100 text-green-700">{readyOrders.length}</Badge>
              </div>
              <div className="space-y-4">
                {readyOrders.map((order) => (
                  <OrderCard key={order.id} order={order} onStatusChange={handleStatusChange} />
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <h2 className="font-semibold">Завершены</h2>
                <Badge variant="outline">{completedOrders.length}</Badge>
              </div>
              <div className="space-y-4">
                {completedOrders.map((order) => (
                  <OrderCard key={order.id} order={order} onStatusChange={handleStatusChange} />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
