"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, logout } from './apiClient'
import { User } from './types'

interface UserContextValue {
  user: User | null
  loading: boolean
  refresh: () => Promise<void>
  signOut: () => void
}

const UserContext = createContext<UserContextValue | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  async function refresh() {
    setLoading(true)
    try {
      const u = await auth.me()
      setUser(u)
    } catch (e) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  function signOut() {
    logout()
    setUser(null)
  }

  return <UserContext.Provider value={{ user, loading, refresh, signOut }}>{children}</UserContext.Provider>
}

export function useUser() {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUser must be used within UserProvider')
  return ctx
}
