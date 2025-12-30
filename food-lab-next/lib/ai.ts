import productsData from './products.json'

export type Nutrition = {
  calories: number
  protein: number
  fat: number
  carbs: number
}

export type Product = {
  id: string
  name: string
  per100g: Nutrition
  allergens?: string[]
}

const products: Product[] = (productsData as any).products
const barcodes: Record<string, string> = (productsData as any).barcodes || {}

export function findProductByName(query: string): Product | null {
  const q = query.trim().toLowerCase()
  if (!q) return null
  // exact then partial match
  let p = products.find((p) => p.name.toLowerCase() === q)
  if (p) return p
  p = products.find((p) => p.name.toLowerCase().includes(q))
  if (p) return p
  // fallback: search by id
  return products.find((p) => p.id.toLowerCase().includes(q)) || null
}

export async function recognizeFromImage(_base64: string) {
  // Mock implementation: return most caloric product with estimated portion
  // In real app, call ML model or external API
  const sample = products[Math.floor(Math.random() * products.length)]
  const estimatedPortion = 150 // grams
  return {
    item: sample,
    confidence: 0.6,
    estimatedPortion,
  }
}

export function parseTextDish(text: string) {
  const p = findProductByName(text)
  return {
    item: p,
    parsedText: text,
  }
}

export function lookupBarcode(code: string) {
  const pid = barcodes[code]
  if (!pid) return null
  return products.find((p) => p.id === pid) || null
}

export function calculateNutritionFor(product: Product, grams: number): Nutrition {
  const factor = grams / 100
  return {
    calories: Math.round(product.per100g.calories * factor),
    protein: Number((product.per100g.protein * factor).toFixed(2)),
    fat: Number((product.per100g.fat * factor).toFixed(2)),
    carbs: Number((product.per100g.carbs * factor).toFixed(2)),
  }
}

export function analyzeIngredients(ingredientsText: string) {
  const parts = ingredientsText.split(',').map((s) => s.trim()).filter(Boolean)
  const found = parts.map((p) => ({ name: p, match: findProductByName(p) }))
  return found
}

export function estimatePortionSizeFromText(text: string) {
  // very simple heuristic: look for numbers like '150g' or '1 шт'
  const gramsMatch = text.match(/(\d+)\s?g/)
  if (gramsMatch) return Number(gramsMatch[1])
  const piecesMatch = text.match(/(\d+)\s?(шт|piece|pcs)/i)
  if (piecesMatch) {
    const pieces = Number(piecesMatch[1])
    return pieces * 80 // assume 80g per piece
  }
  return 150
}

export function dailyCalorieGoal(profile?: { age?: number; sex?: string; weight?: number; height?: number; activity?: number }) {
  // Very simple default
  return 2000
}

export function detectAllergens(product: Product, userRestrictions: string[] = []) {
  const found = (product.allergens || []).filter((a) => userRestrictions.includes(a))
  return found
}

export function recommendDietFromMeals(meals: Array<{ nutrition: Nutrition }>) {
  const total = meals.reduce(
    (acc, m) => ({
      calories: acc.calories + m.nutrition.calories,
      protein: acc.protein + m.nutrition.protein,
      fat: acc.fat + m.nutrition.fat,
      carbs: acc.carbs + m.nutrition.carbs,
    }),
    { calories: 0, protein: 0, fat: 0, carbs: 0 }
  )
  const goal = dailyCalorieGoal()
  const text = total.calories > goal ? 'Вы превысили дневную норму калорий' : 'Вы в рамках дневной нормы'
  return { total, goal, recommendation: text }
}

export default {
  findProductByName,
  recognizeFromImage,
  parseTextDish,
  lookupBarcode,
  calculateNutritionFor,
  analyzeIngredients,
  estimatePortionSizeFromText,
  dailyCalorieGoal,
  detectAllergens,
  recommendDietFromMeals,
}
