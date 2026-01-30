"use client"

import { useEffect, useState } from 'react'
import { auth } from '@/lib/apiClient'
import { User } from '@/lib/types'

export default function StudentDashboardPage() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    auth.me().then(setUser).catch(() => setUser(null))
  }, [])

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-2xl font-bold">Студент - Панель</h1>
      {!user && <p>Жүктелуде немесе жүйеге кіріңіз</p>}
      {user && (
        <div className="mt-6">
          <p>Сәлем, <strong>{user.email}</strong></p>
          <p>Рөл: {user.role}</p>
        </div>
      )}
    </div>
  )
}
