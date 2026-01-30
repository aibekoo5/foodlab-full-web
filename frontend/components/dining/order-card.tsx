"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

interface Order {
  id: number
  studentName: string
  food: string
  drink: string
  time: string
  status: "preparing" | "ready" | "completed"
}

interface OrderCardProps {
  order: Order
  onStatusChange: (id: number, status: Order["status"]) => void
}

const statusConfig = {
  preparing: { label: "Готовится", color: "bg-amber-100 text-amber-700" },
  ready: { label: "Готово", color: "bg-green-100 text-green-700" },
  completed: { label: "Завершен", color: "bg-slate-100 text-slate-700" },
}

export function OrderCard({ order, onStatusChange }: OrderCardProps) {
  const nextStatus = order.status === "preparing" ? "ready" : "completed"

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="font-semibold">#{order.id}</p>
            <p className="text-sm text-muted-foreground">{order.studentName}</p>
          </div>
          <Badge className={statusConfig[order.status].color}>{statusConfig[order.status].label}</Badge>
        </div>

        <div className="space-y-1 mb-4">
          <p className="font-medium">{order.food}</p>
          <p className="text-sm text-muted-foreground">{order.drink}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {order.time}
          </div>
          {order.status !== "completed" && (
            <Button
              size="sm"
              onClick={() => onStatusChange(order.id, nextStatus)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {order.status === "preparing" ? "Готово" : "Завершить"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
