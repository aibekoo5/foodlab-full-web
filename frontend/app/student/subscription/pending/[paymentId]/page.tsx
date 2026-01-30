"use client"

import { useEffect, useState, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { subscriptions } from '@/lib/apiClient'
import { useToast } from '@/hooks/use-toast'

export default function PaymentPendingPage() {
  const params = useParams() as { paymentId?: string }
  const paymentId = params?.paymentId
  const router = useRouter()
  const { toast } = useToast()

  const [checking, setChecking] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const intervalRef = useRef<number | null>(null)

  async function checkSubscription() {
    setChecking(true)
    try {
      const sub = await subscriptions.getMySubscription()
      if (sub && sub.is_active) {
        setIsActive(true)
        toast({ title: 'Төлем расталды', description: 'Абонемент белсенді. Қайта бағытталуда...' })
        router.push('/student/subscription')
      }
    } catch (err: any) {
      // If 404 -> not ready yet, ignore; otherwise show error
      if ((err as any).status && (err as any).status === 404) {
        // no subscription yet
      } else {
        toast({ title: 'Қате', description: err.message || 'Ошибка при проверке статуса' })
      }
    } finally {
      setChecking(false)
    }
  }

  useEffect(() => {
    if (!paymentId) return

    // start polling every 5s
    checkSubscription()
    intervalRef.current = window.setInterval(() => {
      setAttempts((a) => a + 1)
      checkSubscription()
    }, 5000)

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentId])

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-2xl font-bold">Төлем күтіп тұр</h1>
      <p className="mt-2 text-sm text-muted-foreground">Төлем ID: <strong>{paymentId}</strong></p>

      <div className="mt-6">
        <p>Біз төлемді тексеріп жатырмыз, бұл кейде бірнеше секундқа созылуы мүмкін.</p>
        <div className="mt-4 flex gap-2">
          <button className="btn" onClick={checkSubscription} disabled={checking}>{checking ? 'Тексеруде...' : 'Қазір тексеру'}</button>
          <button className="btn outline" onClick={() => router.push('/student/subscription')}>Пакеттерге өту</button>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">Сынақ саны: {attempts}</p>
      </div>
    </div>
  )
}
