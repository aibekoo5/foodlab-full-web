"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { auth, saveToken } from '@/lib/apiClient'
import { useUser } from '@/lib/user-context'
import { useToast } from '@/hooks/use-toast'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"

type UserRole = "student" | "dining" | "admin"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<UserRole>("student")
  const [isLoading, setIsLoading] = useState(false)
  const { refresh } = useUser()
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const token = await auth.login({ email, password })
      saveToken(token)
      // get fresh user info directly from API to avoid stale context
      const me = await auth.me().catch(() => null)
      await refresh()
      toast({ title: 'Кіру сәтті өтті', description: 'Сіз жүйеге кірдіңіз' })

      const userRole = me?.role || 'USER'
      if (userRole === 'CANTEEN') router.push('/canteen/orders')
      else if (userRole === 'ADMIN') router.push('/admin')
      else router.push('/student')
    } catch (err: any) {
      toast({ title: 'Қате', description: err.message || 'Login failed' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      {/* Simple header */}
      <header className="border-b border-border bg-background">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-fit"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-2xl font-bold text-primary">FoodLab</span>
          </Link>
        </div>
      </header>

      {/* Login form */}
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Войти в аккаунт</CardTitle>
            <CardDescription>Введите ваши данные для входа в систему</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="student@narxoz.kz"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Тип аккаунта</Label>
                <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Выберите тип" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Студент</SelectItem>
                    <SelectItem value="dining">Сотрудник столовой</SelectItem>
                    <SelectItem value="admin">Администратор</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Вход..." : "Войти"}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                <Link href="/register" className="text-primary hover:underline">
                  Создать аккаунт
                </Link>
                {" · "}
                <Link href="/forgot-password" className="text-primary hover:underline">
                  Забыли пароль?
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
