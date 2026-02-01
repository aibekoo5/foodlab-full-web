"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, User, LogIn, LogOut, ChevronDown } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/i18n"
import { useUser } from "@/lib/user-context"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false)
  const { language, setLanguage } = useLanguage()
  const t = translations[language]
  const { user, signOut } = useUser()

  const userRole = user?.role

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/foodlab-logo/foodlab-logo.png" alt="FoodLab Logo" className="h-12 w-auto rounded-2xl" />
            <span className="text-xl font-bold text-primary">FoodLab</span>
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

          <div className="flex items-center gap-3">
            <div className="hidden md:block relative">
              <button
                onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium bg-muted rounded-lg"
              >
                {language === "ru" ? "РУ" : "KЗ"}
                <ChevronDown className="h-4 w-4" />
              </button>
              {languageDropdownOpen && (
                <div className="absolute right-0 top-full mt-1 bg-background border border-border rounded-lg shadow-md z-50">
                  <button
                    onClick={() => {
                      setLanguage("ru")
                      setLanguageDropdownOpen(false)
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      language === "ru" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}
                  >
                    РУ
                  </button>
                  <button
                    onClick={() => {
                      setLanguage("kz")
                      setLanguageDropdownOpen(false)
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      language === "kz" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}
                  >
                    KЗ
                  </button>
                </div>
              )}
            </div>

            <div className="md:hidden relative">
              <button
                onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                className="flex items-center gap-1 px-2 py-1.5 text-sm font-medium bg-muted rounded-lg"
              >
                {language === "ru" ? "РУ" : "KЗ"}
                <ChevronDown className="h-4 w-4" />
              </button>
              {languageDropdownOpen && (
                <div className="absolute right-0 top-full mt-1 bg-background border border-border rounded-lg shadow-md z-50">
                  <button
                    onClick={() => {
                      setLanguage("ru")
                      setLanguageDropdownOpen(false)
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      language === "ru" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}
                  >
                    РУ
                  </button>
                  <button
                    onClick={() => {
                      setLanguage("kz")
                      setLanguageDropdownOpen(false)
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      language === "kz" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}
                  >
                    KЗ
                  </button>
                </div>
              )}
            </div>

            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <Link href="#how" className="text-sm font-medium">
                {t.how}
              </Link>
              <Link href="#packages" className="text-sm font-medium">
                {t.packages}
              </Link>
              <Link href="#canteens" className="text-sm font-medium">
                {t.canteens}
              </Link>
              <Link href="/drinks" className="text-sm font-medium">
                {t.drinks}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
