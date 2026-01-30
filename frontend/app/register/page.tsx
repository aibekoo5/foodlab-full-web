"use client"

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth, saveToken } from '@/lib/apiClient'
import { useUser } from '@/lib/user-context'
import { useToast } from '@/hooks/use-toast'
import { UserCreate } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { refresh } = useUser()
  const { toast } = useToast()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const payload: UserCreate = { email, password }
      const user = await auth.register(payload as any)
      // Auto-login
      const token = await auth.login({ email, password })
      saveToken(token)
      await refresh()
      toast({ title: 'Тіркелу сәтті өтті', description: 'Сіз жүйеге кірдіңіз' })
      router.push('/student')
    } catch (err: any) {
      setError(err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <header className="border-b border-border bg-background">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-fit">
            <span className="text-2xl font-bold text-primary">FoodLab</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Тіркелу / Register</CardTitle>
            <CardDescription>Создайте аккаунт чтобы начать пользоваться FoodLab</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="student@narxoz.kz" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>

              {error && <div className="text-red-600 mt-2">{error}</div>}

              <div className="mt-4">
                <Button className="w-full" type="submit" disabled={loading}>{loading ? '...' : 'Register'}</Button>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                Уже тіркелген бе? <Link href="/login" className="text-primary hover:underline">Кіру</Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
