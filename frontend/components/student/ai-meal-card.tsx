"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { calculateNutritionFor, Product } from "@/lib/ai"

type Props = {
  product: Product
  grams?: number
  onSave?: (payload: any) => void
}

export function AiMealCard({ product, grams = 150, onSave }: Props) {
  const nutrition = calculateNutritionFor(product, grams)

  function handleSave() {
    const meals = JSON.parse(localStorage.getItem('aiMeals' || '[]') || '[]')
    const item = { id: Date.now(), productId: product.id, name: product.name, grams, nutrition, date: new Date().toISOString() }
    meals.push(item)
    localStorage.setItem('aiMeals', JSON.stringify(meals))
    onSave?.(item)
  }

  return (
    <Card>
      <div className="flex items-start gap-4 p-4">
        <div className="h-20 w-20 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">Img</div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">{product.name}</div>
              <div className="text-xs text-muted-foreground">Вес: {grams} г</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-primary">{nutrition.calories} ккал</div>
              <div className="text-xs text-muted-foreground">{nutrition.protein} / {nutrition.fat} / {nutrition.carbs} г</div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-end gap-2">
            <Button variant="secondary" onClick={handleSave}>Сохранить</Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default AiMealCard
