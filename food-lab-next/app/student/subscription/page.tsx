"use client"

import { useEffect, useState } from 'react'
import { subscriptions } from '@/lib/apiClient'
import { SubscriptionPackage } from '@/lib/types'

export default function StudentSubscriptionPage() {
  const [packages, setPackages] = useState<SubscriptionPackage[]>([])
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    subscriptions.listPackages().then(setPackages).catch(() => setPackages([]))
  }, [])

  async function handleBuy(p: SubscriptionPackage) {
    setLoadingId(p.id)
    try {
      const payment = await subscriptions.buy(p.id)
      if (payment.payment_url) {
        toast({ title: 'Жөнелту', description: 'Сіз Kaspi бетіне бағытталасыз' })
        window.location.href = payment.payment_url
        return
      }
      toast({ title: 'Төлем басталды', description: 'Төлем аясында' })
    } catch (err: any) {
      toast({ title: 'Қате', description: err.message || 'Purchase failed' })
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-2xl font-bold">Пакеттер</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {packages.map((p) => (
          <div key={p.id} className="card p-4">
            <h3 className="font-semibold">{p.name}</h3>
            <p className="mt-2">Бағасы: {p.price}</p>
            <p>Түскі ас саны: {p.meal_count}</p>
            <button className="btn mt-4" onClick={() => handleBuy(p)} disabled={loadingId === p.id}>
              {loadingId === p.id ? '...' : 'Сатып алу'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
