import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Кабинет студента | FoodLab",
  description: "Управляйте своей подпиской и заказами",
}

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
