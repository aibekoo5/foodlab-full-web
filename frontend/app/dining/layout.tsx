import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Панель столовой | FoodLab",
  description: "Управление заказами и меню столовой",
}

export default function DiningLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
