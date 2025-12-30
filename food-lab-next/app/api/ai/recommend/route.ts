import { NextResponse } from 'next/server'
import ai from '@/lib/ai'

export async function POST(req: Request) {
  const { meals } = await req.json()
  if (!meals) return NextResponse.json({ error: 'meals required' }, { status: 400 })
  const res = ai.recommendDietFromMeals(meals)
  return NextResponse.json(res)
}
