"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/i18n"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { language, setLanguage } = useLanguage()
  const t = translations[language]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <img
              src="/foodlab-logo/foodlab-logo.png"
              alt="FoodLab Logo"
              className="h-10 w-auto rounded-xl"
            />
            <span className="text-xl font-bold text-foreground">
              Food<span className="text-primary">Lab</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#who"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.whoIsItFor}
            </Link>
            <Link
              href="#how"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.how}
            </Link>
            <Link
              href="#packages"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.packages}
            </Link>
            <Link
              href="#news"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t.news}
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg border border-border hover:bg-accent transition-colors"
              >
                {language === "ru" ? "RU" : "KZ"}
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
              {languageDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden min-w-[80px]">
                  <button
                    onClick={() => { setLanguage("ru"); setLanguageDropdownOpen(false) }}
                    className={`block w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      language === "ru" ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                    }`}
                  >
                    RU
                  </button>
                  <button
                    onClick={() => { setLanguage("kz"); setLanguageDropdownOpen(false) }}
                    className={`block w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      language === "kz" ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                    }`}
                  >
                    KZ
                  </button>
                </div>
              )}
            </div>

            <Link href="#packages" className="hidden md:block">
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-5">
                {t.choosePlan}
              </Button>
            </Link>

            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-4">
              <Link href="#who" className="text-sm font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
                {t.whoIsItFor}
              </Link>
              <Link href="#how" className="text-sm font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
                {t.how}
              </Link>
              <Link href="#packages" className="text-sm font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
                {t.packages}
              </Link>
              <Link href="#news" className="text-sm font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
                {t.news}
              </Link>
              <Link href="#packages" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full mt-2">
                  {t.choosePlan}
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
