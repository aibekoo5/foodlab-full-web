"use client"

import { useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

export default function SubscriptionsConfirmPage() {
  const search = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const paymentId = search.get('payment_id') || search.get('id')
    if (paymentId) {
      router.push(`/student/subscription/pending/${paymentId}`)
    } else {
      // fallback
      router.push('/student/subscription')
    }
  }, [search, router])

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-2xl font-bold">Төлем өңделуде</h1>
      <p className="mt-4">Сіз бағытталып отырсыз — күте тұрыңыз...</p>
    </div>
  )
}
