"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/i18n"
import { SiTiktok, SiThreads, SiInstagram } from 'react-icons/si';

export function Footer() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-5 gap-8 mb-8">
          <div>
            <Link href="/" className="text-2xl font-bold text-primary">
              FoodLab
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">{t.footerDescription}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t.quickLinks}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#packages" className="hover:text-primary">
                  {t.packages}
                </Link>
              </li>
              <li>
                <Link href="#canteens" className="hover:text-primary">
                  {t.canteens}
                </Link>
              </li>
              <li>
                <Link href="/drinks" className="hover:text-primary">
                  {t.drinks}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t.support}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  {t.contact}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t.contact}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>aibek.kemel@narxoz.kz</li>
              <li>+7 (777) 506-0775</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t.social}</h4>
            <div className="grid grid-cols-4 md:gap-4">
              <div>
                <Link href="#" className="flex items-center justify-center w-full py-4 text-white bg-black rounded-lg hover:bg-opacity-90 transition-colors">
                  <SiInstagram className="h-6 w-6 mr-1" />
                </Link>
              </div>
              <div>
                <Link href="#" className="flex items-center justify-center w-full py-4 text-white bg-black rounded-lg hover:bg-opacity-90 transition-colors">
                  <SiTiktok className="h-6 w-6 mr-2" />
                </Link>
              </div>
              <div>
                <Link href="#" className="flex items-center justify-center w-full py-4 text-white bg-black rounded-lg hover:bg-opacity-90 transition-colors">
                  <SiThreads className="h-6 w-6 mr-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          © 2025 FoodLab. {t.allRightsReserved}
        </div>
      </div>
    </footer>
  )
}
