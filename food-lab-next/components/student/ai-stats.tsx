"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { recommendDietFromMeals, detectAllergens, Product, calculateNutritionFor } from "@/lib/ai"
import productsData from '@/lib/products.json'
import { Button } from '@/components/ui/button'
import {
  ChartContainer,
  ChartTooltip,
  ChartLegendContent,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  Tooltip,
} from 'recharts'

type Meal = {
  id: number
  productId: string
  name: string
  grams: number
  nutrition: { calories: number; protein: number; fat: number; carbs: number }
  date: string
}

export function AiStats() {
  const [meals, setMeals] = useState<Meal[]>([])
  const [period, setPeriod] = useState<'day'|'week'|'month'>('day')
  const [userAllergens, setUserAllergens] = useState<string>('')

  function generateMockMeals() {
    const products = (productsData as any).products as Product[]
    const mock: Meal[] = []
    const now = new Date()
    for (let i = 6; i >= 0; i--) {
      const day = new Date(now)
      day.setDate(now.getDate() - i)
      const mealsCount = Math.floor(Math.random() * 2) + 1
      for (let j = 0; j < mealsCount; j++) {
        const p = products[Math.floor(Math.random() * products.length)]
        const grams = 80 + Math.floor(Math.random() * 200)
        const nutrition = calculateNutritionFor(p, grams)
        mock.push({
          id: Date.now() + Math.floor(Math.random() * 100000) + i * 10 + j,
          productId: p.id,
          name: p.name,
          grams,
          nutrition,
          date: new Date(day.getFullYear(), day.getMonth(), day.getDate(), 12 + j).toISOString(),
        })
      }
    }
    localStorage.setItem('aiMeals', JSON.stringify(mock))
    setMeals(mock)
  }

  useEffect(() => {
    const raw = localStorage.getItem('aiMeals')
    const parsed = raw ? JSON.parse(raw) : []

    if (!parsed || parsed.length === 0) {
      generateMockMeals()
    } else {
      setMeals(parsed)
    }
  }, [])

  const filtered = useMemo(() => {
    const now = new Date()
    return meals.filter((m) => {
      const d = new Date(m.date)
      if (period === 'day') return d.toDateString() === now.toDateString()
      if (period === 'week') {
        const start = new Date(now)
        start.setDate(now.getDate() - now.getDay())
        return d >= start
      }
      // month
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    })
  }, [meals, period])

  const total = filtered.reduce(
    (acc, m) => ({
      calories: acc.calories + m.nutrition.calories,
      protein: acc.protein + m.nutrition.protein,
      fat: acc.fat + m.nutrition.fat,
      carbs: acc.carbs + m.nutrition.carbs,
    }),
    { calories: 0, protein: 0, fat: 0, carbs: 0 }
  )

  const recommendation = recommendDietFromMeals(filtered as any)
  const userAllergenList = userAllergens.split(',').map((s) => s.trim()).filter(Boolean)
  const products = (productsData as any).products as Product[]
  const allergenAlerts = meals
    .map((m) => ({ name: m.name, productId: m.productId }))
    .filter((m) => {
      const prod = products.find((p) => p.id === m.productId)
      if (!prod) return false
      return (prod.allergens || []).some((a: string) => userAllergenList.includes(a))
    })

  const summaryCards = [
    { title: 'Калории', value: total.calories, accent: 'text-primary' },
    { title: 'Белки', value: total.protein.toFixed(1), accent: 'text-emerald-600' },
    { title: 'Жиры', value: total.fat.toFixed(1), accent: 'text-amber-600' },
    { title: 'Углеводы', value: total.carbs.toFixed(1), accent: 'text-sky-600' },
  ]

  function getDailyTotals(days = 7) {
    const data: { date: string; calories: number; protein: number; fat: number; carbs: number }[] = []
    const now = new Date()
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now)
      d.setDate(now.getDate() - i)
      const key = d.toLocaleDateString()
      const dayMeals = meals.filter((m) => new Date(m.date).toDateString() === d.toDateString())
      const totals = dayMeals.reduce(
        (acc, m) => ({
          calories: acc.calories + m.nutrition.calories,
          protein: acc.protein + m.nutrition.protein,
          fat: acc.fat + m.nutrition.fat,
          carbs: acc.carbs + m.nutrition.carbs,
        }),
        { calories: 0, protein: 0, fat: 0, carbs: 0 }
      )
      data.push({ date: key, ...totals })
    }
    return data
  }

  const last7 = getDailyTotals(7)

  function ChartTooltipContentWrapper(props: any) {
    // Adapt recharts tooltip props to our ChartTooltipContent
    const { active, payload, label } = props
    return <ChartTooltipContent active={active} payload={payload} label={label} />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Статистика питания</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {summaryCards.map((c, i) => (
            <div key={i} className="p-3 bg-muted/40 rounded">
              <div className="text-sm text-muted-foreground">{c.title}</div>
              <div className={`text-lg font-semibold ${c.accent}`}>{c.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-2">
          <label className="block text-sm">Период</label>
          <Select onValueChange={(v) => setPeriod(v as any)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Выберите период" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">День</SelectItem>
              <SelectItem value="week">Неделя</SelectItem>
              <SelectItem value="month">Месяц</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-4">
          <label className="block text-sm">Аллергены (через запятую)</label>
          <Input className="w-64" value={userAllergens} onChange={(e) => setUserAllergens(e.target.value)} />
          {allergenAlerts.length > 0 && (
            <div className="text-sm text-red-600 mt-2">Найдены продукты с потенциальными аллергенами: {allergenAlerts.map(a => a.name).join(', ')}</div>
          )}
        </div>

        <div className="mt-4 flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="min-w-0">
            <strong>Рекомендация:</strong>
            <div className="truncate">{recommendation.recommendation} (цель: {recommendation.goal} ккал)</div>
          </div>

          <div className="ml-0 md:ml-auto flex gap-2 flex-wrap">
            <Button variant="destructive" size="sm" onClick={() => { localStorage.removeItem('aiMeals'); setMeals([]) }} className="whitespace-nowrap">Очистить данные</Button>
            <Button variant="default" size="sm" onClick={() => generateMockMeals()} className="whitespace-nowrap">Сгенерировать примерные данные</Button>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-sm font-medium mb-2">Калории за последний 7 дней</h4>

          <ChartContainer id="ai-calories" config={{ calories: { label: 'Ккал', color: 'var(--color-primary)' } }}>
            <LineChart data={last7} margin={{ top: 6, right: 12, left: 0, bottom: 6 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip content={<ChartTooltipContentWrapper />} />
              <Line type="monotone" dataKey="calories" stroke="var(--color-calories, #3b82f6)" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ChartContainer>
        </div>

        <div className="mt-6">
          <h4 className="text-sm font-medium mb-2">Потребление макронутриентов (последние 7 дней)</h4>

          <ChartContainer id="ai-macros" config={{ protein: { label: 'Белки', color: '#10b981' }, fat: { label: 'Жиры', color: '#f59e0b' }, carbs: { label: 'Углеводы', color: '#0ea5e9' } }}>
            <BarChart data={last7} margin={{ top: 6, right: 12, left: 0, bottom: 6 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="protein" fill="var(--color-protein, #10b981)" />
              <Bar dataKey="fat" fill="var(--color-fat, #f59e0b)" />
              <Bar dataKey="carbs" fill="var(--color-carbs, #0ea5e9)" />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default AiStats
