"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AiMealCard from "./ai-meal-card"
import AiStats from "./ai-stats"
import AiHeader from "./ai-header"
import aiLib from "@/lib/ai"
import { Camera, Search, Barcode } from "lucide-react"

export function AiDiet() {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [recognized, setRecognized] = useState<any | null>(null)
  const [textQuery, setTextQuery] = useState('')
  const [barcode, setBarcode] = useState('')

  async function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setImagePreview(URL.createObjectURL(file))

    // convert file to base64 string for mock AI
    const toBase64 = (f: File) => new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(String(reader.result))
      reader.onerror = reject
      reader.readAsDataURL(f)
    })

    const base64 = await toBase64(file)
    const res = await aiLib.recognizeFromImage(base64)
    if (res?.item) setRecognized({ item: res.item, grams: res.estimatedPortion ?? 150, confidence: res.confidence ?? 0.8 })
    else alert('Не удалось распознать блюдо')
  }

  async function handleText() {
    const res = await aiLib.parseTextDish(textQuery)
    if (res.item) setRecognized({ item: res.item, grams: aiLib.estimatePortionSizeFromText(textQuery), confidence: 0.9 })
    else alert('Не удалось распознать блюдо')
  }

  async function handleBarcode() {
    const found = aiLib.lookupBarcode(barcode)
    if (found) setRecognized({ item: found, grams: 150, confidence: 0.95 })
    else alert('Штрихкод не найден в базе')
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg bg-background">
            <div className="flex items-center gap-3 mb-3">
              <Camera className="h-5 w-5 text-primary" />
              <h4 className="font-medium">Распознавание по фото</h4>
            </div>
            <input aria-label="Загрузить фото блюда" type="file" accept="image/*" onChange={handleImage} />
            {imagePreview && <img src={imagePreview} alt="preview" className="mt-3 max-h-40 rounded" />}
          </div>

          <div className="p-4 border rounded-lg bg-background">
            <div className="flex items-center gap-3 mb-3">
              <Search className="h-5 w-5 text-primary" />
              <h4 className="font-medium">Текстовое распознавание</h4>
            </div>
            <div className="flex gap-2">
              <Input value={textQuery} onChange={(e) => setTextQuery(e.target.value)} placeholder="Например: Куриный салат" />
              <Button onClick={handleText}>Поиск</Button>
            </div>
          </div>

          <div className="p-4 border rounded-lg bg-background md:col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <Barcode className="h-5 w-5 text-primary" />
              <h4 className="font-medium">Поиск по штрихкоду</h4>
            </div>
            <div className="flex gap-2">
              <Input value={barcode} onChange={(e) => setBarcode(e.target.value)} placeholder="Введите штрихкод" />
              <Button onClick={handleBarcode}>Поиск</Button>
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="p-4 border rounded-lg bg-background">
            <h4 className="font-medium mb-2">Результат распознавания</h4>
            {recognized ? (
              <div>
                <AiMealCard product={recognized.item} grams={recognized.grams} onSave={() => alert('Сохранено')} />
                <div className="text-sm text-muted-foreground mt-2">Доверие: {(recognized.confidence * 100).toFixed(0)}%</div>
              </div>
            ) : (
              <div className="text-sm">Нет распознанных блюд</div>
            )}
          </div>

          <AiStats />
        </aside>
      </div>
    </div>
  )
}

export default AiDiet
