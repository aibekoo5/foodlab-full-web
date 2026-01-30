"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Home, QrCode, History, Settings, LogOut, Menu, X, Activity } from "lucide-react"
import { useState } from "react"

export function StudentHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            FoodLab
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/student" className="flex items-center gap-2 text-sm font-medium hover:text-primary">
              <Home className="h-4 w-4" />
              Главная
            </Link>
            <Link href="/student/scan" className="flex items-center gap-2 text-sm font-medium hover:text-primary">
              <QrCode className="h-4 w-4" />
              Сканировать QR
            </Link>
            <Link href="/student/history" className="flex items-center gap-2 text-sm font-medium hover:text-primary">
              <History className="h-4 w-4" />
              История
            </Link>
            <Link href="/student/ai" className="flex items-center gap-2 text-sm font-medium hover:text-primary">
              <Activity className="h-4 w-4" />
              AI-рацион
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder-user.jpg" alt="Студент" />
                    <AvatarFallback>СТ</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/student/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Настройки
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/">
                    <LogOut className="mr-2 h-4 w-4" />
                    Выйти
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <Link href="/student" className="flex items-center gap-2 text-sm font-medium">
                <Home className="h-4 w-4" />
                Главная
              </Link>
              <Link href="/student/scan" className="flex items-center gap-2 text-sm font-medium">
                <QrCode className="h-4 w-4" />
                Сканировать QR
              </Link>
              <Link href="/student/history" className="flex items-center gap-2 text-sm font-medium">
                <History className="h-4 w-4" />
                История
              </Link>
              <Link href="/student/ai" className="flex items-center gap-2 text-sm font-medium">
                <Activity className="h-4 w-4" />
                AI-рацион
              </Link>
              <Link href="/student/settings" className="flex items-center gap-2 text-sm font-medium">
                <Settings className="h-4 w-4" />
                Настройки
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
