"use client"

import { DiningSidebar } from "@/components/dining/dining-sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { useState } from "react"

interface MenuItem {
  id: number
  name: string
  description: string
  available: boolean
  quantity: number
}

const initialMenu: MenuItem[] = [
  { id: 1, name: "Манты", description: "5 шт в порции", available: true, quantity: 50 },
  { id: 2, name: "Плов", description: "С мясом", available: true, quantity: 30 },
  { id: 3, name: "Гречка с котлетой", description: "Порция 350г", available: true, quantity: 25 },
  { id: 4, name: "Сосиски с картофелем", description: "2 сосиски + пюре", available: false, quantity: 0 },
]

export default function DiningMenuPage() {
  const [menu, setMenu] = useState<MenuItem[]>(initialMenu)

  const toggleAvailability = (id: number) => {
    setMenu(menu.map((item) => (item.id === id ? { ...item, available: !item.available } : item)))
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      <DiningSidebar />

      <div className="flex-1">
        <header className="bg-background border-b border-border p-4">
          <h1 className="text-xl font-bold">Меню дня</h1>
          <p className="text-sm text-muted-foreground">Управление блюдами</p>
        </header>

        <main className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Сегодняшнее меню</h2>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
              <Plus className="h-4 w-4" />
              Добавить блюдо
            </Button>
          </div>

          <div className="grid gap-4">
            {menu.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                        <span className="text-2xl">🍽️</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{item.name}</p>
                          {!item.available && <Badge variant="destructive">Закончилось</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                        <p className="text-sm text-muted-foreground">
                          Осталось: <span className="font-medium">{item.quantity}</span> порций
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`available-${item.id}`} className="text-sm">
                          Доступно
                        </Label>
                        <Switch
                          id={`available-${item.id}`}
                          checked={item.available}
                          onCheckedChange={() => toggleAvailability(item.id)}
                        />
                      </div>
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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
