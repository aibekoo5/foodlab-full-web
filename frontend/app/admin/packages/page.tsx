"use client"

import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { formatNumber } from "@/lib/utils"

const packages = [
  { id: 1, name: "Basic Plan", price: 15000, meals: 20, subscribers: 456, active: true },
  { id: 2, name: "Pro Plan", price: 20000, meals: 30, subscribers: 892, active: true },
  { id: 3, name: "Enterprise Plan", price: 25000, meals: 40, subscribers: 234, active: true },
]

export default function AdminPackagesPage() {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <AdminSidebar />

      <div className="flex-1">
        <header className="bg-background border-b border-border p-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Пакеты подписки</h1>
            <p className="text-sm text-muted-foreground">Управление планами</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
            <Plus className="h-4 w-4" />
            Новый пакет
          </Button>
        </header>

        <main className="p-6">
          <div className="grid gap-6">
            {packages.map((pkg) => (
              <Card key={pkg.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-semibold">{pkg.name}</h3>
                          <Badge className={pkg.active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-700"}>
                            {pkg.active ? "Активен" : "Неактивен"}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">{pkg.meals} обедов</p>
                      </div>

                      <div className="border-l border-border pl-6">
                        <p className="text-3xl font-bold text-primary">{formatNumber(pkg.price)}₸</p>
                      </div>

                      <div className="border-l border-border pl-6">
                        <p className="text-2xl font-semibold">{pkg.subscribers}</p>
                        <p className="text-sm text-muted-foreground">подписчиков</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                        <Pencil className="h-4 w-4" />
                        Изменить
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1 text-destructive bg-transparent">
                        <Trash2 className="h-4 w-4" />
                        Удалить
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
