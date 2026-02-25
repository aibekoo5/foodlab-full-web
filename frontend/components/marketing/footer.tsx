"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/i18n"
import { SiTiktok, SiThreads, SiInstagram } from "react-icons/si"

export function Footer() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-bold text-foreground">
              Food<span className="text-primary">Lab</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              {t.footerDescription}
            </p>
            <div className="flex gap-3 mt-6">
              <Link
                href="https://www.instagram.com/foodlapp"
                className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="Instagram"
              >
                <SiInstagram className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="TikTok"
              >
                <SiTiktok className="h-4 w-4" />
              </Link>
              <Link
                href="https://www.threads.com/@foodlapp"
                className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="Threads"
              >
                <SiThreads className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">{t.quickLinks}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="#who" className="hover:text-primary transition-colors">{t.whoIsItFor}</Link>
              </li>
              <li>
                <Link href="#how" className="hover:text-primary transition-colors">{t.how}</Link>
              </li>
              <li>
                <Link href="#packages" className="hover:text-primary transition-colors">{t.packages}</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">{t.support}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="#faq" className="hover:text-primary transition-colors">FAQ</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">{t.contact}</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">{t.contact}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>aibek.kemel@narxoz.kz</li>
              <li>+7 (777) 506-0775</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
          {"© 2025 FoodLab. "}{t.allRightsReserved}
        </div>
      </div>
    </footer>
  )
}
