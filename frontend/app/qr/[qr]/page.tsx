"use client"

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { orders } from '@/lib/apiClient'
import { MenuItem, Canteen } from '@/lib/types'
import { useToast } from '@/hooks/use-toast'

export default function QRPage() {
  const params = useParams() as { qr?: string }
  const qr = params?.qr || ''
  const router = useRouter()
  const { toast } = useToast()

  const [canteen, setCanteen] = useState<Canteen | null>(null)
  const [menu, setMenu] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!qr) return
    orders
      .getQrMenu(qr)
      .then((res) => {
        setCanteen(res as any)
        setMenu((res as any).menu_items || [])
      })
      .catch((err) => {
        toast({ title: 'Қате', description: err.message || 'Failed to load menu' })
      })
  }, [qr])

  async function placeOrder(item: MenuItem) {
    if (!canteen) return
    setLoading(true)
    try {
      // Attempt to create order (use food_id or drink_id depending on type)
      const payload: any = { canteen_id: canteen.id }
      if (item.type === 'food') payload.food_id = item.id
      else payload.drink_id = item.id
      const ord = await orders.create(payload)
      toast({ title: 'Сәтті', description: 'Тапсырыс жіберілді' })
      router.push('/student/orders')
    } catch (err: any) {
      // Handle payment required
      if (err.code === 'PAYMENT_REQUIRED' || err.status === 402) {
        toast({ title: 'Пайыз', description: 'Абонемент жоқ немесе аяқталды. Пакет сатып алуға бағытталасыз.' })
        router.push('/student/subscription')
        return
      }
      toast({ title: 'Қате', description: err.message || 'Order failed' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-2xl font-bold">{canteen?.name || 'Асхана'}</h1>
      <p className="text-sm text-muted-foreground">{canteen?.location}</p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {menu.map((m) => (
          <div key={m.id} className="card p-4 flex items-center justify-between">
            <div>
              <div className="font-semibold">{m.name}</div>
              <div className="text-sm text-muted-foreground">{m.type} — {m.price ? `${m.price} тг` : ''}</div>
            </div>
            <div>
              <button className="btn" onClick={() => placeOrder(m)} disabled={!m.available || loading}>
                {m.available ? 'Заказать' : 'Нет в наличии'}
              </button>
            </div>
          </div>
        ))}
        {menu.length === 0 && <p>Мәзір жоқ</p>}
      </div>
    </div>
  )
}
