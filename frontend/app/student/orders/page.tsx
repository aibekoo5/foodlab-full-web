"use client"

import { useEffect, useState } from 'react'
import { orders } from '@/lib/apiClient'
import { Order } from '@/lib/types'

export default function StudentOrdersPage() {
  const [ordersList, setOrdersList] = useState<Order[]>([])

  useEffect(() => {
    orders.myOrders().then(setOrdersList).catch(() => setOrdersList([]))
  }, [])

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-2xl font-bold">Тапсырыстар тарихы</h1>
      <div className="mt-6 space-y-4">
        {ordersList.map((o) => (
          <div key={o.id} className="card p-4">
            <div>Order #{o.id}</div>
            <div>Күн: {o.created_at}</div>
            <div>Статус: {o.status}</div>
          </div>
        ))}
        {ordersList.length === 0 && <p>Тапсырыс жоқ</p>}
      </div>
    </div>
  )
}
