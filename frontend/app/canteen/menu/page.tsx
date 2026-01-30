"use client"

import { useEffect, useState } from 'react'
import { canteen } from '@/lib/apiClient'
import { MenuItem } from '@/lib/types'

export default function CanteenMenuPage() {
  const [menu, setMenu] = useState<MenuItem[]>([])

  useEffect(() => {
    canteen.getMenu().then(setMenu).catch(() => setMenu([]))
  }, [])

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-2xl font-bold">Асхана - Мәзір</h1>
      <div className="mt-6 space-y-4">
        {menu.map((m) => (
          <div key={m.id} className="card p-4 flex justify-between items-center">
            <div>
              <div className="font-semibold">{m.name}</div>
              <div className="text-sm text-muted-foreground">{m.type}</div>
            </div>
            <div>
              <button className="btn">Toggle</button>
            </div>
          </div>
        ))}
        {menu.length === 0 && <p>Мәзір бос</p>}
      </div>
    </div>
  )
}
