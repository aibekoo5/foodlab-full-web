import { Suspense } from 'react'
import SubscriptionsConfirmClient from './SubscriptionsConfirmClient'

export default function Page() {
  return (
    <Suspense fallback={<div className="p-10">Жүктелуде...</div>}>
      <SubscriptionsConfirmClient />
    </Suspense>
  )
}
