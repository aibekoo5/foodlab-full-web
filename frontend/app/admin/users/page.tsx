"use client"

import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, MoreHorizontal, AlertTriangle } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const users = [
  {
    id: 1,
    name: "Алия Касымова",
    email: "aliya.k@narxoz.kz",
    plan: "Pro Plan",
    mealsLeft: 15,
    status: "active",
    fraud: false,
  },
  {
    id: 2,
    name: "Даурен Мухамедов",
    email: "dauren.m@narxoz.kz",
    plan: "Basic Plan",
    mealsLeft: 8,
    status: "active",
    fraud: false,
  },
  {
    id: 3,
    name: "Нурсултан Ахметов",
    email: "nursultan.a@narxoz.kz",
    plan: "Pro Plan",
    mealsLeft: 0,
    status: "expired",
    fraud: true,
  },
  {
    id: 4,
    name: "Айгерим Токаева",
    email: "aigerim.t@narxoz.kz",
    plan: "Enterprise",
    mealsLeft: 25,
    status: "active",
    fraud: false,
  },
  {
    id: 5,
    name: "Бауржан Серик",
    email: "baurzhan.s@narxoz.kz",
    plan: "Basic Plan",
    mealsLeft: 3,
    status: "active",
    fraud: false,
  },
]

export default function AdminUsersPage() {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <AdminSidebar />

      <div className="flex-1">
        <header className="bg-background border-b border-border p-4">
          <h1 className="text-xl font-bold">Пользователи</h1>
          <p className="text-sm text-muted-foreground">Управление студентами</p>
        </header>

        <main className="p-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Все пользователи</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Поиск..." className="pl-9 w-64" />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Пользователь</TableHead>
                    <TableHead>План</TableHead>
                    <TableHead>Осталось</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                          {user.fraud && <AlertTriangle className="h-4 w-4 text-red-500" />}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.plan}</Badge>
                      </TableCell>
                      <TableCell>{user.mealsLeft} обедов</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            user.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                          }
                        >
                          {user.status === "active" ? "Активен" : "Истек"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Просмотр профиля</DropdownMenuItem>
                            <DropdownMenuItem>История заказов</DropdownMenuItem>
                            <DropdownMenuItem>Изменить план</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Заблокировать</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
