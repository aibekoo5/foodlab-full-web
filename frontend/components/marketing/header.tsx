"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, User, LogIn, LogOut } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/i18n"
import { useUser } from "@/lib/user-context"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { language, setLanguage } = useLanguage()
  const t = translations[language]
  const { user, signOut } = useUser()

  const userRole = user?.role

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">FoodLab</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="#how" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              {t.how}
            </Link>
            <Link href="#packages" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              {t.packages}
            </Link>
            <Link href="#canteens" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              {t.canteens}
            </Link>
            <Link href="/drinks" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              {t.drinks}
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <div className="flex rounded-full overflow-hidden">
              <button
                onClick={() => setLanguage("ru")}
                className={`px-4 py-1.5 text-sm font-medium transition-colors rounded-full ${
                  language === "ru" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                РУ
              </button>
              <button
                onClick={() => setLanguage("kz")}
                className={`px-4 py-1.5 text-sm font-medium transition-colors rounded-full ${
                  language === "kz" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                KЗ
              </button>
            </div>
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <Link href="#packages" className="text-sm font-medium">
                {t.packages}
              </Link>
              <Link href="#canteens" className="text-sm font-medium">
                {t.canteens}
              </Link>
              <Link href="/drinks" className="text-sm font-medium">
                {t.drinks}
              </Link>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setLanguage("ru")}
                  className={`px-4 py-1.5 text-sm font-medium transition-colors rounded-full ${
                    language === "ru" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  РУ
                </button>
                <button
                  onClick={() => setLanguage("kz")}
                  className={`px-4 py-1.5 text-sm font-medium transition-colors rounded-full ${
                    language === "kz" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  KЗ
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
