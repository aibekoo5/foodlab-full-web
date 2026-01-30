import { NextResponse } from 'next/server'
import ai from '@/lib/ai'

export async function POST(req: Request) {
  const { text } = await req.json()
  if (!text) return NextResponse.json({ error: 'text required' }, { status: 400 })
  const res = ai.parseTextDish(text)
  return NextResponse.json(res)
}
