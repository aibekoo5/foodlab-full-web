"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, Store, Package, CreditCard, BarChart3, Settings, LogOut, QrCode } from "lucide-react"

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Дашборд" },
  { href: "/admin/users", icon: Users, label: "Пользователи" },
  { href: "/admin/canteens", icon: Store, label: "Столовые" },
  { href: "/admin/packages", icon: Package, label: "Пакеты" },
  { href: "/admin/finance", icon: CreditCard, label: "Финансы" },
  { href: "/admin/analytics", icon: BarChart3, label: "Аналитика" },
  { href: "/admin/qr", icon: QrCode, label: "QR коды" },
  { href: "/admin/settings", icon: Settings, label: "Настройки" },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-foreground text-background min-h-screen p-6 hidden lg:flex flex-col">
      <Link href="/admin" className="text-2xl font-bold text-primary mb-2">
        FoodLab
      </Link>
      <p className="text-sm text-background/60 mb-8">Админ панель</p>

      <nav className="space-y-1 flex-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
              pathname === item.href
                ? "bg-primary text-primary-foreground"
                : "text-background/70 hover:bg-background/10",
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </nav>

      <Link
        href="/"
        className="flex items-center gap-3 px-4 py-3 text-background/70 hover:text-background transition-colors mt-auto"
      >
        <LogOut className="h-5 w-5" />
        Выйти
      </Link>
    </aside>
  )
}
