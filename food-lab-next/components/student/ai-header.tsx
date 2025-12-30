"use client"

import { Camera, Search, Barcode, Sparkles } from "lucide-react"

export function AiHeader() {
  return (
    <header className="rounded-2xl bg-gradient-to-r from-primary/10 to-transparent p-6 mb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">AI-рацион</h1>
            <p className="text-sm text-muted-foreground mt-1">Распознавание еды, расчёт калорий и рекомендации на основе ИИ</p>
          </div>

          <div className="flex gap-3 items-center">
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <Camera className="h-4 w-4 text-primary" /> Распознавание по фото
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <Search className="h-4 w-4 text-primary" /> Текстовый поиск
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <Barcode className="h-4 w-4 text-primary" /> Штрихкод
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" /> Персональные рекомендации
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default AiHeader
