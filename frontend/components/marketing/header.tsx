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
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const navLinks = [
    { href: "#how", label: t.howItWorks },
    { href: "#packages", label: t.packages },
    { href: "#partners", label: t.partners },
    { href: "#reviews", label: t.reviews },
    { href: "#faq", label: t.faqLink },
  ]

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-18 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <img
              src="/foodlab-logo/foodlab-logo.png"
              alt="FoodLab Logo"
              className="h-10 w-auto rounded-xl transition-transform duration-300 group-hover:scale-105"
            />
            <span className="text-xl font-bold text-foreground tracking-tight">
              Food<span className="text-primary">Lapp</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-primary rounded-lg hover:bg-primary/5 transition-all duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-xl bg-secondary text-secondary-foreground hover:bg-primary/10 transition-all duration-300"
              >
                {language === "ru" ? "RU" : "KZ"}
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${languageDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {languageDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 bg-background border border-border rounded-xl shadow-lg overflow-hidden min-w-[80px]">
                  <button
                    onClick={() => { setLanguage("ru"); setLanguageDropdownOpen(false) }}
                    className={`block w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      language === "ru" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                    }`}
                  >
                    RU
                  </button>
                  <button
                    onClick={() => { setLanguage("kz"); setLanguageDropdownOpen(false) }}
                    className={`block w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      language === "kz" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                    }`}
                  >
                    KZ
                  </button>
                </div>
              )}
            </div>

            <Link href="#packages" className="hidden lg:block">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6 font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/25">
                {t.choosePlan}
              </Button>
            </Link>

            <button
              className="lg:hidden p-2 rounded-xl hover:bg-secondary transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            mobileMenuOpen ? "max-h-96 opacity-100 pb-6" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-1 pt-4 border-t border-border">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-sm font-medium rounded-xl hover:bg-secondary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link href="#packages" onClick={() => setMobileMenuOpen(false)} className="mt-2">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl">
                {t.choosePlan}
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
