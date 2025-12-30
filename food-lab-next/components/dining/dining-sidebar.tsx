"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ClipboardList, UtensilsCrossed, BarChart3, Settings, LogOut } from "lucide-react"

const navItems = [
  { href: "/dining", icon: ClipboardList, label: "Заказы" },
  { href: "/dining/menu", icon: UtensilsCrossed, label: "Меню дня" },
  { href: "/dining/stats", icon: BarChart3, label: "Статистика" },
  { href: "/dining/settings", icon: Settings, label: "Настройки" },
]

export function DiningSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-foreground text-background min-h-screen p-6 hidden lg:block">
      <Link href="/dining" className="text-2xl font-bold text-primary mb-8 block">
        FoodLab
      </Link>
      <p className="text-sm text-background/60 mb-8">Панель столовой</p>

      <nav className="space-y-2">
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

      <div className="absolute bottom-6 left-6">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 text-background/70 hover:text-background transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Выйти
        </Link>
      </div>
    </aside>
  )
}
