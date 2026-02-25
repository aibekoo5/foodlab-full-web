"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/i18n"
import { SiTiktok, SiThreads, SiInstagram } from "react-icons/si"

export function Footer() {
  const { language } = useLanguage()
  const t = translations[language]

  const socialLinks = [
    { icon: SiInstagram, href: "https://www.instagram.com/foodlapp", label: "Instagram" },
    { icon: SiTiktok, href: "#", label: "TikTok" },
    { icon: SiThreads, href: "https://www.threads.com/@foodlapp", label: "Threads" },
  ]

  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <img
                src="/foodlab-logo/foodlab-logo.png"
                alt="FoodLab Logo"
                className="h-10 w-auto rounded-xl"
              />
              <span className="text-xl font-bold text-foreground">
                Food<span className="text-primary">Lapp</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed mb-6">
              {t.footerDescription}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <social.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t.quickLinks}</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#packages" className="text-muted-foreground hover:text-primary transition-colors">
                  {t.packages}
                </Link>
              </li>
              <li>
                <Link href="#partners" className="text-muted-foreground hover:text-primary transition-colors">
                  {t.partners}
                </Link>
              </li>
              <li>
                <Link href="#how" className="text-muted-foreground hover:text-primary transition-colors">
                  {t.howItWorks}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t.support}</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  {t.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t.contact}</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>aibek.kemel@narxoz.kz</li>
              <li>+7 (777) 506-0775</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} FoodLab. {t.allRightsReserved}
        </div>
      </div>
    </footer>
  )
}
